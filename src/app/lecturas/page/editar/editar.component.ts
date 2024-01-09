import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServlecturasService } from '../../servicio/servlecturas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceObtenerFacService } from 'src/app/facturas/service/service-obtener-fac.service';
import { MensajeokComponent } from 'src/app/core/components/mensajeok/mensajeok.component';
import { ServeTarifaAguaService } from 'src/app/configuracion/serve/serve-tarifa-agua.service';

@Component({
  selector: 'gst-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  @ViewChild('inputNombre') inputNombre!: ElementRef;
  @ViewChild('inputCedula') inputCedula!: ElementRef;
  @ViewChild('inputMedidor') inputMedidor!: ElementRef;
  @ViewChild('inputMes') inputMes!: ElementRef;
  @ViewChild('inputAnterior') inputAnterior!: ElementRef;

  lecturaForm: FormGroup;
  private metCubicosC: number = 0;
  private basicoC: number = 0;
  private excesoC: number = 0;
  private metCubicosR: number = 0;
  private basicoR: number = 0;
  private excesoR: number = 0;

  constructor(
    private _medidoresService: ServlecturasService,
    private _facturas: ServiceObtenerFacService,
    private dialogRef: MatDialogRef<EditarComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackBar: MatSnackBar,
    private _servTarifa: ServeTarifaAguaService
  ) {

    this.lecturaForm = this.fb.group({
      CED_USU: ['', Validators.required],
      NOMBRES: ['', Validators.required],
      TIPO_MED: ['', Validators.required],
      LEC_ANT: ['', Validators.required],
      LEC_ACT: ['', [Validators.required, this.verificarLecturaIngreso.bind(this)]],
      MES_CON: ['', Validators.required]
    });
    this.obtenerTarifaConsumo()
    this.obtenerTarifaRiego()
    this.obtenerValorConsumo()
    this.obtenerValorRiego()
  }

  ngOnInit(): void {
    this.cargarDatosFormulario();
  }
  ngAfterViewInit() {
    this.bloquearEntradaTexto();
  }

  bloquearEntradaTexto() {
    this.inputCedula.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
    });
    this.inputNombre.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
    });
    this.inputMedidor.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
    });
    this.inputAnterior.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
    });
    this.inputMes.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
    });
  }
  cargarDatosFormulario(): void {
    const rowData = this.data.rowData;
    this.lecturaForm.patchValue({
      CED_USU: rowData.CED_USU,
      TIPO_MED: rowData.TIPO_MED,
      NOMBRES: `${rowData.APE_USU} ${rowData.NOM_USU}`,
      LEC_ANT: rowData.LEC_ANT,
      LEC_ACT: rowData.LEC_ACT,
      MES_CON: rowData.MES_CON
    });
  }

  editarLectura(): void {
    const tarifasConsumo = localStorage.getItem('tarifaConsumo');
    const tarifasRiego = localStorage.getItem('tarifaRiego');
    if (tarifasConsumo && tarifasRiego) {
      if (this.excesoC !== null && this.basicoC !== null && this.metCubicosC && this.excesoR !== null && this.basicoR !== null && this.metCubicosR) {
        if (this.lecturaForm.valid) {
          const idLectura = this.data.rowData.ID_LEC;
          const lecturaActual = this.lecturaForm.get('LEC_ACT')?.value;
          const diferencia = lecturaActual - this.data.rowData.LEC_ANT;
          const { exceso, total } = this.calcularTotal(diferencia);
          if (lecturaActual >= this.data.rowData.LEC_ANT) {
            this.actualizarLectura(idLectura, lecturaActual, exceso, total);
          } else {
            this.mensajeError('La lectura Actual debe ser mayor a la Lectura Anterior');
          }
        }
      } else {
        this.mensajeError('No existen las tarifas para realizar la factura');
      }
    } else {
      this.mensajeError('No existen las tarifas para realizar la factura');
    }
  }

  calcularTotal(diferencia: number): { exceso: number, total: number } {
    let exceso = 0;
    let total = 0;

    if (this.data.selectedTipo === 'CONSUMO') {
      if (diferencia >= this.metCubicosC) {
        exceso = diferencia - this.metCubicosC;
        total = this.basicoC + (exceso * this.excesoC);

      } else {
        total = this.basicoC;
      }
    } else if (this.data.selectedTipo === 'RIEGO') {
      if (diferencia >= this.metCubicosR) {
        exceso = diferencia - this.metCubicosR;
        total = this.basicoR + (exceso * this.excesoR);
      } else {
        total = this.basicoR;
      }
    }

    return { exceso, total: +total.toFixed(2) };
  }

  obtenerTarifaConsumo(): void {
    const tarifasLocalStorage = localStorage.getItem('tarifaConsumo');
    if (tarifasLocalStorage) {
      try {
        const tarifas = JSON.parse(tarifasLocalStorage);
        if (Array.isArray(tarifas) && tarifas.length > 0) {
          const { met_cubicos, basico, exceso } = tarifas[0]; // Desestructurar el primer objeto del array
          this.metCubicosC = met_cubicos;
          this.basicoC = basico;
          this.excesoC = exceso;

        } else {
          console.log('El array está vacío o no es válido');
        }
      } catch (error) {
        console.error('Error al analizar datos del localStorage:', error);
      }
    } else {
      console.log('Las tarifas no están disponibles en el localStorage.');
      this.obtenerTarifaConsumo()
    }
  }


  obtenerTarifaRiego(): void {
    const tarifasLocalStorage = localStorage.getItem('tarifaRiego');
    if (tarifasLocalStorage) {
      try {
        const tarifas = JSON.parse(tarifasLocalStorage);
        if (Array.isArray(tarifas) && tarifas.length > 0) {
          const { met_cubicos, basico, exceso } = tarifas[0]; // Desestructurar el primer objeto del array
          this.metCubicosR = met_cubicos;
          this.basicoR = basico;
          this.excesoR = exceso;

        } else {
          console.log('El array está vacío o no es válido');
        }
      } catch (error) {
        console.error('Error al analizar datos del localStorage:', error);
      }
    } else {
      console.log('Las tarifas no están disponibles en el localStorage.');
      this.obtenerTarifaRiego()
    }
  }

  obtenerValorConsumo() {
    this._servTarifa.getTarifasConsumo().subscribe(
      (tarifas) => {
        localStorage.setItem('tarifaConsumo', JSON.stringify(tarifas));
      },
      (error) => {
        console.error('Error al obtener las tarifas:', error);
      }
    );
  }

  obtenerValorRiego() {
    this._servTarifa.getTarifasRiego().subscribe(
      (tarifas) => {
        localStorage.setItem('tarifaRiego', JSON.stringify(tarifas));
      },
      (error) => {
        console.error('Error al obtener las tarifas:', error);
      }
    );
  }

  actualizarLectura(id: number, lectura: number, exceso: number, total: number): void {
    this._medidoresService.putLectura(lectura, id).subscribe(
      () => {
        this.cerrarModal();
        this.showMessage("Lectura editada correctamente");
        this.editarFactura(exceso, total, id);
      },
      (error) => {
        if (error.status === 409) {
          this.mensajeError('La lectura no se puede editar, la factura ya está pagada.');
        } else {
          console.error('Error al intentar editar', error);
          this.showMessage('Ocurrió un error al intentar editar la lectura');
        }
      }
    );
  }

  editarFactura(exceso: number, total: number, idLectura: number): void {
    this._facturas.putFacturasForlecture(exceso, total, idLectura).subscribe(
      () => {
        //this.showMessage("Factura editada correctamente")
      },
      (error) => {
        console.error('Error al editar Factura:', error);
      }
    )
  }

  mensajeError(mensaje: string): void {
    this.dialog.open(MensajeokComponent, {
      data: {
        title: 'Aviso',
        message: mensaje
      }
    });
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  showMessage(message: string, duration: number = 5000): void {
    this.snackBar.open(message, '', { duration });
  }
  verificarLecturaIngreso(control: AbstractControl) {
    if (!control.dirty || !control.value) {
      return null;
    }
    const lecturaAnterior = parseFloat(this.lecturaForm.get('LEC_ANT')?.value);
    const lecturaIngreso = parseFloat(control.value);
    return lecturaIngreso >= lecturaAnterior ? null : { lecturaInvalida: true };
  }
}
