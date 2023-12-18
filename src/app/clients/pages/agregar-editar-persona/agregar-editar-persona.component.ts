import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServpersonaService } from '../modelo/persona/servpersona.service';
import { Persona } from '../modelo/persona/interfaces/persona';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngresoEditMedidorComponent } from '../../medidores/ingreso-edit-medidor/ingreso-edit-medidor.component';
import { Router } from '@angular/router';
import { ServiceMedidores } from '../../medidores/service/service-medidores';
import { MedidoresListComponent } from '../../medidores/medidores-list/medidores-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';

@Component({
  selector: 'gst-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent {
  form!: FormGroup;
  personadata: Persona;
  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
    private fb: FormBuilder,
    private _personaService: ServpersonaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private _servMedidores: ServiceMedidores,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.personadata = {} as Persona;
    this.initializeForm();
    this.populateFormIfEdit();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/), this.validarCedula]],
      nombre: ['', [Validators.required, Validators.maxLength(20), this.validarNombre]],
      apellido: ['', [Validators.required, Validators.maxLength(20), this.validarApellido]],
      telefono: ['', [ Validators.pattern(/^[0-9]*$/), this.validarNumeroTelefono]],
      correo: ['', [ this.validarCorreo]],
    });
  }

  populateFormIfEdit(): void {
    if (this.data.isEdit) {
      this.isEdit = true;
      this.personadata = this.data.persona;
      this.form.patchValue({
        cedula: this.personadata.CED_USU,
        nombre: this.personadata.NOM_USU,
        apellido: this.personadata.APE_USU,
        telefono: this.personadata.TEL_USU,
        correo: this.personadata.CORREO_USU,
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  addEditPersona(): void {
    if (this.form.valid) {
      let telefono = this.form.value.telefono || '0000000000';
      let correo = this.form.value.correo || 'sncorreo@gmail.com';
      const personaDatas = {
        CED_USU: this.form.value.cedula,
        NOM_USU: this.form.value.nombre,
        APE_USU: this.form.value.apellido,
        TEL_USU: telefono,
        CORREO_USU: correo,
        ESTADO: 'ACTIVO',
        CONTRASENA: this.form.value.cedula,
      };

      if (this.isEdit) {
        this.editPersona(personaDatas);
      } else {
        this.addPersona(personaDatas);
      }
    }
  }

  editPersona(personaDatas: any): void {
    this._personaService.editPersona(this.personadata.CED_USU, personaDatas).subscribe(
      (response) => this.showMessage('Datos actualizados con éxito'),
      (error) => this.showMessage('Error al actualizar datos:', error)
    );
  }

  addPersona(personaDatas: any): void {
    this._personaService.addPersona(personaDatas).subscribe(
      (response) => {
        if (response && response.msg === 'Datos insertados con éxito') {
          this.showMessage('Datos insertados con éxito');
          this.pasardatos(personaDatas);
        } else {
        }
      },
      (error) => {
        if (error && error.error && error.error.error === 'La cédula ya existe en la base de datos') {
          this.mensajeError('La cédula ya existe en la base de datos')
        } else {
          this.showMessage('Error al insertar datos:', error);
        }
      }
    );
  }
 //la parte de isnertar Mediddor
  pasardatos(personaDatas: any) {
    const ingresarMedidor = (formData: any) => {
      if (formData) {
        formData.ESTADO = 'ACTIVO';
        formData.CODIGO_QR = 'NULL';
        this._servMedidores.ingresarMedidor(formData).subscribe(
          (respuesta) => {
            this.showMessage('Se ha ingresado un medidor');
            const dialogRef = this.dialog.open(IngresoEditMedidorComponent, {
              data: { personaDatas },
            });
            dialogRef.afterClosed().subscribe((formData) => {
              ingresarMedidor(formData);
            });
          },
          (error) => {
            // Manejo de errores
          }
        );
      }
    };
    const dialogRef = this.dialog.open(IngresoEditMedidorComponent, {
      data: { personaDatas },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      ingresarMedidor(formData);
    });

  }
  mensajeError(mensaje: string) {
    const dialogRef = this.dialog.open(AbrirDialogoComponent, {
      data: {
        title: 'Aviso',
        message: mensaje
      }
    });
  }
  records: any[] = [];
  dataSource!: MatTableDataSource<any>;
  cargarDatos() {
    this._servMedidores.getMedidores().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource<any>(this.records);
      
    });
  }
  //
  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration })
    this.dialogRef.close(true);
  }
  validarNombre(control: AbstractControl): { [key: string]: any } | null {
    const nombre: string = control.value;
    if (nombre && (nombre.trim().length < 3 || !/^[a-zA-Z]+\s?[a-zA-Z]*$/.test(nombre))) {
      return { invalidNombre: true };
    }
    return null;
  }

  validarApellido(control: AbstractControl): { [key: string]: any } | null {
    const nombre: string = control.value;
    if (nombre && (nombre.trim().length < 4 || !/^[a-zA-Z]+\s?[a-zA-Z]*$/.test(nombre))) {
      return { invalidApellido: true };
    }
    return null;
  }

  validarNumeroTelefono(control: AbstractControl): { [key: string]: any } | null {
    const telefono: string = control.value;
    if (telefono && (telefono.trim().length !== 10 || !/^\d{10}$/.test(telefono))) {
      return { invalidTelefono: true };
    }
    return null;
  }

  validarCorreo(control: AbstractControl): { [key: string]: any } | null {
    const correo: string = control.value;
    if (correo && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo)) {
      return { invalidCorreo: true };
    }
    return null;
  }
  convertirAMayusculas(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.value) {
      control.setValue(control.value.toUpperCase(), { emitEvent: false });
    }
  }
  validarCedula(control: AbstractControl): { [key: string]: any } | null {
    const cedula = control.value;
    if (!/^\d{10}$/.test(cedula)) {
      return { formatoInvalido: true };
    }
    if (/^(\d)\1{9}$/.test(cedula)) {
      return { cedulaInvalida: true };
    }
    if (cedula.length > 10) {
      return { formatoInvalido: true };
    }
    const provincia = Number(cedula.substr(0, 2));
    const tercerDigito = Number(cedula.charAt(2));
    if (provincia < 0 || provincia > 24 || tercerDigito < 0 || tercerDigito > 6) {
      return { cedulaInvalida: true };
    }
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let digito = Number(cedula.charAt(i));
      if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
      suma += digito;
    }
    const decenaSuperior = Math.ceil(suma / 10) * 10;
    const digitoVerificador = decenaSuperior - suma;
    if (digitoVerificador !== Number(cedula.charAt(9))) {
      return { cedulaInvalida: true };
    }
    return null; // La cédula es válida
  }
}

