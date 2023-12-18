import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServlecturasService } from '../../servicio/servlecturas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceObtenerFacService } from 'src/app/facturas/service/service-obtener-fac.service';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';

@Component({
  selector: 'gst-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  lecturaForm: FormGroup;
  mes: string = 'cambiar';
  constructor(
    private _medidoresService: ServlecturasService,
    private _facturas: ServiceObtenerFacService,
    private dialogRef: MatDialogRef<EditarComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackBar: MatSnackBar
  ) {
    
    this.lecturaForm = this.fb.group({
      CED_USU: ['', Validators.required],
      NOMBRES: ['', Validators.required],
      TIPO_MED: ['', Validators.required],
      LEC_ANT: ['', Validators.required],
      LEC_ACT: ['', [Validators.required, this.verificarLecturaIngreso.bind(this)]],
      MES_CON: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDatosFormulario();
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
  }

  calcularTotal(diferencia: number): { exceso: number, total: number } {
    let exceso = 0;
    let total = 0;
  
    if (this.data.selectedTipo === 'CONSUMO') {
      if (diferencia >= 10) {
        exceso = diferencia - 10;
        total = 1.50 + (exceso * 0.28);
      } else {
        total = 1.50;
      }
    } else if (this.data.selectedTipo === 'RIEGO') {
      if (diferencia >= 20) {
        exceso = diferencia - 20;
        total = 5.50 + (exceso * 0.28);
      } else {
        total = 5.50;
      }
    }
  
    total = +total.toFixed(2);
    return { exceso, total };
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
    this.dialog.open(AbrirDialogoComponent, {
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
