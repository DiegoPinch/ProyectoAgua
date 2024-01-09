import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FechahoraService } from 'src/app/services/time/fechahora.service';
import { ServiceMedidores } from '../service/service-medidores';
import { MensajeokComponent } from 'src/app/core/components/mensajeok/mensajeok.component';
import { ServpersonaService } from '../../pages/modelo/persona/servpersona.service';
import { Persona } from '../../pages/modelo/persona/interfaces/persona';

@Component({
  selector: 'gst-ingreso-edit-medidor',
  templateUrl: './ingreso-edit-medidor.component.html',
  styleUrls: ['./ingreso-edit-medidor.component.css']
})
export class IngresoEditMedidorComponent {
  @ViewChild('inputAñoIngreso') inputAñoIngreso!: ElementRef;
  @ViewChild('inputCedula') inputCedula!: ElementRef;
  title = '';
  group!: FormGroup;
  selectedTipo: string = '';
  options: string[] = ['CONSUMO', 'RIEGO'];
  fechaActual: string = '';
  isCedulaEditable: boolean = true;
  showSpinnerA: boolean = false;

  constructor(private reference: MatDialogRef<IngresoEditMedidorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fechaHoraService: FechahoraService,
    public dialog: MatDialog,
    private _servMedidores: ServiceMedidores, private _servPersona: ServpersonaService) {
    this.title = this.data && this.data.isEdit ? 'EDITAR MEDIDOR' : 'NUEVO MEDIDOR';
    this.fecha();

  }

  ngAfterViewInit() {
    this.bloquearEntradaTexto();
  }

  bloquearEntradaTexto() {
    this.inputAñoIngreso.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
    });
    if (!this.isCedulaEditable) {
      this.inputCedula.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
        event.preventDefault();
      });
    }
  }

  
  selectedName: string | null = null;
  usuarios: Persona[] = []; // Supongamos que aquí tienes tus usuarios
  filteredUsers: Persona[] = [];

  applyFilter(event: any): void {
    const query = event.target.value;
    if (query.length >= 3) {
      this._servPersona.getPersona(query).subscribe(
        (resultados) => {
          this.filteredUsers = resultados;

        },
        (error) => {
          console.error('Error al buscar personas:', error);
        }
      );
    } else {
      this.filteredUsers = this.usuarios; // Restaurar la lista completa cuando la consulta es menor a 3 caracteres
      this.selectedName = null; // Reinicia selectedName cuando la consulta es menor a 3 caracteres
    }
  }

  setValueAndFilter(user: Persona, inputField: HTMLInputElement): void {
    const fullName = `${user.CED_USU}`;
    inputField.value = fullName;
    this.group.get('CED_USU_MED')?.patchValue(fullName);
    this.selectedName = `${user.APE_USU} ${user.NOM_USU}`;
    this.applyFilter({ target: { value: fullName } }); // Aplicar filtro con el valor seleccionado
    setTimeout(() => {
      inputField.blur();
    }, 0);
  }

  ngOnInit(): void {
    if (this.data && this.data.isEdit) {
      this.loadForm(this.data.rowData);
      this.isCedulaEditable = false;
    } else {
      this.loadForm();

    }
  }

  fecha() {
    this.showSpinnerA = true;
    this.fechaHoraService.obtenerFechaHoraActual().subscribe(
      (data: any) => {
        const fecha = new Date(data.datetime);
        this.fechaActual = this.formatearFecha(fecha);
        this.showSpinnerA = false;
        if (!this.data || !this.data.isEdit) {
          this.loadForm();

        }
      },
      error => {
        console.error('Error al obtener la fecha actual:', error);
      }
    );
  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  loadForm(rowData?: any) {
    const formData = {
      CED_USU_MED: rowData ? rowData.CED_USU : '',
      MARCA_MED: rowData ? rowData.MARCA_MED : '',
      OBS_MED: rowData ? rowData.OBS_MED : '',
      AÑO_INGRESO: rowData ? rowData.AÑO_INGRESO : this.fechaActual,
      TIPO_MED: rowData ? rowData.TIPO_MED : '',
      CODIGO_QR: rowData ? rowData.CODIGO_QR : '',
      LEC_ING: rowData ? rowData.LEC_ING : '',
    };

    this.group = new FormGroup({
      CED_USU_MED: new FormControl({ value: formData.CED_USU_MED, disabled: !this.isCedulaEditable }, [Validators.required, Validators.pattern('^[0-9]*$'), this.validarCedula]),
      MARCA_MED: new FormControl(formData.MARCA_MED, Validators.required),
      OBS_MED: new FormControl(formData.OBS_MED, Validators.required),
      AÑO_INGRESO: new FormControl(formData.AÑO_INGRESO, Validators.required),
      TIPO_MED: new FormControl(formData.TIPO_MED, Validators.required),
      CODIGO_QR: new FormControl(formData.CODIGO_QR),
      LEC_ING: new FormControl(formData.LEC_ING, [Validators.required, this.verificarLecturaIngreso.bind(this)]),
    });

    if (this.data && this.data.personaDatas && this.data.personaDatas.CED_USU) {
      this.group.get('CED_USU_MED')?.setValue(this.data.personaDatas.CED_USU);
    }

    if (rowData && rowData.TIPO_MED) {
      this.selectedTipo = rowData.TIPO_MED;
    }

  }
  verificarLecturaIngreso(control: AbstractControl) {
    const lecturaIngreso = control.value;
    return lecturaIngreso >= 0 ? null : { lecturaInvalida: true };
  }

  save() {
    if (this.group.value.LEC_ING >= 0) {
      if (this.data && this.data.isEdit) {
        const record = this.group.value;
        this.reference.close(record);
      } else {
        this._servMedidores.getVerificarMedidor(this.group.value.CED_USU_MED, this.group.value.TIPO_MED).subscribe((data) => {
          if (data[0]) {
            this.mensajeError("Usuario con Medidor existente")
          } else {
            const record = this.group.value;
            console.log(record)
            this.reference.close(record);
          }
        });
      }
    } else {
      this.mensajeError("Lectura de Ingreso Incorrecta")
    }

  }

  mensajeError(mensaje: string) {
    const dialogRef = this.dialog.open(MensajeokComponent, {
      data: {
        title: 'Aviso',
        message: mensaje
      }
    });
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
