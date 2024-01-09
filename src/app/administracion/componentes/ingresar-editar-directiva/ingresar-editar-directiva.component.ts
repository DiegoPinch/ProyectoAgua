import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServeDetadminService } from '../../serve/serve-detadmin.service';

@Component({
  selector: 'gst-ingresar-editar-directiva',
  templateUrl: './ingresar-editar-directiva.component.html',
  styleUrls: ['./ingresar-editar-directiva.component.css']
})
export class IngresarEditarDirectivaComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<IngresarEditarDirectivaComponent>,
    private _servicio: ServeDetadminService) {
    this.form = this.formBuilder.group({
      ID_DIR_DET: ['1', [Validators.required, ]],
      CED_USU_DIR: ['', Validators.required],
      CARGO: ['', Validators.required],
      CONTRASENA: ['', [Validators.required, ]],
      OBSERVACIONES: ['', [Validators.required, ]]
    });
  }

  addEditDirectiva() {
    if (this.form.valid) {
      const formData = this.form.value; 
      const datosParaEnviar = {
        ID_DIR_DET: formData.ID_DIR_DET,
        CED_USU_DIR : formData.CED_USU_DIR ,
        AÑO_ING: new Date().toISOString().slice(0, 10),
        CARGO: formData.CARGO,
        CONTRASENA: formData.CONTRASENA,
        ESTADO: 'Activo',
        OBSERVACIONES: formData.OBSERVACIONES
      };
      this._servicio.postAdministracion(datosParaEnviar).subscribe(
        (respuesta) => {
          this.cancelar();
          // Enviar el resultado de la inserción exitosa al cerrar el diálogo
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al agregar la directiva:', error);
         
        }
      );
    } else {
      console.log('Formulario inválido, por favor revisa los campos.');
    }
  }

  
  cancelar(): void {
    this.dialogRef.close();
  }

}
