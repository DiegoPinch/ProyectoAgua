import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServlecturasService } from '../../servicio/servlecturas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceObtenerFacService } from 'src/app/facturas/service/service-obtener-fac.service';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';
import { MensajeokComponent } from 'src/app/core/components/mensajeok/mensajeok.component';
import { ServeTarifaAguaService } from 'src/app/configuracion/serve/serve-tarifa-agua.service';
@Component({
  selector: 'gst-ingresar-editar',
  templateUrl: './ingresar-editar.component.html',
  styleUrls: ['./ingresar-editar.component.css']
})
export class IngresarEditarComponent implements OnInit {
  @ViewChild('inputNombre') inputNombre!: ElementRef;
  @ViewChild('inputCedula') inputCedula!: ElementRef;
  @ViewChild('inputMedidor') inputMedidor!: ElementRef;
  @ViewChild('inputMes') inputMes!: ElementRef;
  @ViewChild('inputAnterior') inputAnterior!: ElementRef;
  lecturaForm: FormGroup;
  estado: string = '';
  private metCubicosC: number = 0;
  private basicoC: number = 0;
  private excesoC: number = 0;
  private metCubicosR: number = 0;
  private basicoR: number = 0;
  private excesoR: number = 0;

  constructor(
    private _medidoresService: ServlecturasService, private _facturas: ServiceObtenerFacService,
    private dialogRef: MatDialogRef<IngresarEditarComponent>, public dialog: MatDialog,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar, private _servTarifa: ServeTarifaAguaService) {
    this.lecturaForm = this.fb.group({
      CED_USU: ['', Validators.required],
      NOMBRES: ['', Validators.required],
      TIP_MED: ['', Validators.required],
      LEC_ANT: ['', Validators.required],
      LEC_ACT: ['', [Validators.required, this.verificarLecturaIngreso.bind(this)]],
      MES_CON: ['', Validators.required]
    });
    this.obtenerTarifaConsumo();
    this.obtenerTarifaRiego();
    this.obtenerValorConsumo();
    this.obtenerValorRiego();
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

  ngOnInit(): void {
    if (this.data && this.data.rowData.CED_USU) {
      this._medidoresService.getLecturaActual(this.data.rowData.CED_USU, this.data.selectedTipo, this.data.selectedMesResta).subscribe(
        (data) => {
          if (Array.isArray(data) && data.length > 0) {
            const lectura = data[0];
            this.estado = lectura.MES_CON
            if (lectura.LEC_ACT !== undefined) {
              this.setearDatos(lectura.LEC_ACT);
            }
          } else {
            this.obtenerUltimaLectura(this.data.rowData.ID_MED)
          }
        },
        (error) => {
          console.error('Error al cargar datos:', error);
        }
      );
    }
  }

  obtenerUltimaLectura(id: number) {
    this._medidoresService.getultimaLecturaInsertada(id).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const lecturaIngreso = data[0];
          this.estado = lecturaIngreso.MES_CON
          this.setearDatos(lecturaIngreso.LEC_ACT);
        } else {
          this.obtenerLecturaInsert(id)
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  obtenerLecturaInsert(id: number) {
    this._medidoresService.getLecturaIngresoMedidor(id).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.estado = 'NUEVO MEDIDOR'
          const lecturaIngreso = data[0];
          this.setearDatos(lecturaIngreso.LEC_ING);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  setearDatos(lec_ingreso: number) {
    this.lecturaForm.patchValue({
      CED_USU: this.data.rowData.CED_USU,
      TIP_MED: this.data.selectedTipo,
      MES_CON: this.data.selectedMes,
      LEC_ANT: lec_ingreso,
      NOMBRES: this.data.rowData.APE_USU + " " + this.data.rowData.NOM_USU,
    });
  }

  verificarLecturaExis() {
    this._medidoresService.verificarLecturaExistente(this.data.selectedMes, this.data.rowData.ID_MED)
      .subscribe(
        (res) => {
          if (res && res.length > 0) {
            this.mensajeError('Medidor con lectura existente en el mes seleccionado')

          } else {
            this.guardarLectura();
          }
        },
        (error) => {
          console.error('Error al verificar la lectura existente:', error);
        }
      );
  }
  mensajeError(mensaje: string) {
    const dialogRef = this.dialog.open(MensajeokComponent, {
      data: {
        title: 'Aviso',
        message: mensaje
      }
    });

  }

  guardarLectura(): void {
    const tarifasConsumo = localStorage.getItem('tarifaConsumo');
    const tarifasRiego = localStorage.getItem('tarifaRiego');
    if (tarifasConsumo && tarifasRiego ) {
      if(this.excesoC !== null && this.basicoC !== null && this.metCubicosC && this.excesoR !== null && this.basicoR !== null && this.metCubicosR){
        if (this.lecturaForm.valid) {
          const lecturaAnterior = this.lecturaForm.get('LEC_ANT')?.value;
          const lecturaActual = this.lecturaForm.get('LEC_ACT')?.value;
          if (!this.esLecturaValida(lecturaAnterior, lecturaActual)) {
            this.mensajeError('La lectura Actual debe ser mayor a la Lectura Anterior');
            return;
          }
          const diferencia = lecturaActual - lecturaAnterior;
          const { exceso, total } = this.calcularExcesoYTotal(diferencia);
          const fechaIngreso = new Date().toISOString().slice(0, 10);
          const mesConsumo = this.data.selectedMes;
          const idMedidor = this.data.rowData.ID_MED;
          this._medidoresService.postLecturas(lecturaAnterior, lecturaActual, fechaIngreso, mesConsumo, idMedidor).subscribe(
            (response: any) => {
              const ID_LEC = response.ID_LEC;
              this.cerrarModal();
              this.showMessage("Lectura insertada correctamente... ");
              this.generarFactura(exceso, total, ID_LEC);
            },
            (error) => {
              console.error('Error al insertar datos:', error);
            }
          );
        }
      }else{
        this.mensajeError('No existen las tarifas para realizar la factura');
      }
    } else {
      this.mensajeError('No existen las tarifas para realizar la factura');
    }
  }

  calcularExcesoYTotal(diferencia: number): { exceso: number, total: number } {
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
      this.obtenerValorConsumo()
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
      this.obtenerValorRiego()
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

  generarFactura(exceso: number, suma: number, id_per: number) {
    const FacturaDatas = {
      FEC_PAGO: null,
      FEC_GENE: new Date().toISOString().slice(0, 10),
      EST_FACT: 'PENDIENTE',
      EXC_LECTURA: exceso,
      SUM_TOTAL: suma,
      ID_LEC_PER: id_per,
    };
    this._facturas.postFacturas(FacturaDatas).subscribe(
      (response) => {

      },
      (error) => {
        console.error('Error al crear Factura:', error);
      }
    )
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration })
  }


  verificarLecturaIngreso(control: AbstractControl) {
    if (!control.dirty || !control.value) {
      return null;
    }
    const lecturaAnterior = parseFloat(this.lecturaForm.get('LEC_ANT')?.value);
    const lecturaIngreso = parseFloat(control.value);
    return lecturaIngreso >= lecturaAnterior ? null : { lecturaInvalida: true };
  }

  esLecturaValida(lecturaAnterior: number, lecturaActual: number): boolean {
    return lecturaActual >= lecturaAnterior;
  }
}
