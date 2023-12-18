import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServlecturasService } from '../../servicio/servlecturas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceObtenerFacService } from 'src/app/facturas/service/service-obtener-fac.service';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';
@Component({
  selector: 'gst-ingresar-editar',
  templateUrl: './ingresar-editar.component.html',
  styleUrls: ['./ingresar-editar.component.css']
})
export class IngresarEditarComponent implements OnInit {
  lecturaForm: FormGroup;
  estado: string ='';
  constructor(
    private _medidoresService: ServlecturasService, private _facturas: ServiceObtenerFacService,
    private dialogRef: MatDialogRef<IngresarEditarComponent>, public dialog: MatDialog,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar) {
    this.lecturaForm = this.fb.group({
      CED_USU: ['', Validators.required],
      NOMBRES: ['', Validators.required],
      TIP_MED: ['', Validators.required],
      LEC_ANT: ['', Validators.required],
      LEC_ACT: ['', [Validators.required, this.verificarLecturaIngreso.bind(this)]],
      MES_CON: ['', Validators.required]
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
        }else{
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
    const dialogRef = this.dialog.open(AbrirDialogoComponent, {
      data: {
        title: 'Aviso',
        message: mensaje
      }
    });
    
  }
  guardarLectura(): void {
    if (this.lecturaForm.valid) {
      const lecturaAnterior = this.lecturaForm.get('LEC_ANT')?.value;
      const lecturaActual = this.lecturaForm.get('LEC_ACT')?.value;
  
      if (!this.esLecturaValida(lecturaAnterior, lecturaActual)) {
        this.mensajeError('La lectura Actual debe ser mayor a la Lectura Anterior');
        return;
      }
  
      const diferencia = lecturaActual - lecturaAnterior;
      const { exceso, total } = this.calcularExcesoYTotal(diferencia);
  
      const fechaIngreso = '2023-11-02';
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
  }
  
  
  
  calcularExcesoYTotal(diferencia: number): { exceso: number, total: number } {
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
  
    return { exceso, total: +total.toFixed(2) };
  }

  generarFactura(exceso: number, suma: number, id_per: number) {
    const FacturaDatas = {
      FEC_PAGO: null,
      FEC_GENE: null,
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
