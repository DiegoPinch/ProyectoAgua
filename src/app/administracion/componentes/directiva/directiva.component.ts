import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
import { ServeDetadminService } from '../../serve/serve-detadmin.service';
import { IngresarEditarDirectivaComponent } from '../ingresar-editar-directiva/ingresar-editar-directiva.component';
import { KeypadButton } from 'src/app/sharedtable/interfaces/keypadbutton.interfaces';

@Component({
  selector: 'gst-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {
  records: any[] = [];
  formulario: FormGroup;
  selectedFileName!: string;
  data: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
   
    { field: "CED_USU_DIR", title: "CEDULA" },
    { field: "AÑO_ING", title: "AÑO INGRESO" },
    { field: "CARGO", title: "CARGO" },
    { field: "ESTADO", title: "ESTADO" },
    { field: "OBSERVACIONES", title: "OBSERVACION" },
    { field: "acciones", title: "ACCIONES" }
  ];
  constructor(private fb: FormBuilder, private _adminService: ServeDetadminService, private dialog: MatDialog) {
    this.formulario = this.fb.group({
      CED_USU_DIR: ["1", Validators.required],
      DOCUMENTO: [null, Validators.required],
      OBSERVACION: [null, Validators.maxLength(50)],
    });
    this.cargarDatos();
    this.changePage(0)
  }
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "person_add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  ngOnInit() {
    
   }
   
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formulario.patchValue({
        DOCUMENTO: file,
      });
    }
  }
  cargarDatos() {
    this._adminService.getAdministracionPhp().subscribe((data: any[]) => {
      this.records = data.map(item => {
        return {
          ID_DET_DIR: item.ID_DET_DIR,
          CED_USU_DIR: item.CED_USU_DIR,
          AÑO_ING: item.AÑO_ING,
          CARGO: item.CARGO,
          ESTADO: item.ESTADO,
          OBSERVACIONES: item.OBSERVACIONES,
          acciones: [
            { icon: 'edit', tooltip: 'Editar ', color: 'primary' },
            { icon: 'delete', tooltip: 'Eliminar ', color: 'warn' },
          ]
        };
      });
      this.totalRecords = this.records.length;
      this.changePage(0); // Llama a changePage después de cargar los datos
    });

  }
  guardar(): void {
    const actaDatas = {
      ID_SESION_ACT: this.formulario.value.ID_SESION_ACT,
      DOCUMENTO: this.formulario.value.DOCUMENTO,
      OBSERVACION: this.formulario.value.OBSERVACION
    };
    this._adminService.postAdministracion(actaDatas).subscribe(
      (response) => {
        console.log('Datos insertados con éxito');
        this.cargarDatos();
      },
      (error) => {
        console.error('Error al insertar datos:', error);
      }
    );
  }

  ejecutarAccion(acciones: any, rowData: any) {
    if (acciones.icon === 'edit') {
      console.log('Editando fila:', rowData);

      const dialogRef = this.dialog.open(IngresarEditarDirectivaComponent, {
        width: '600px',
        data: {
          cedula: rowData.CED_USU,
          lecActual: rowData.LEC_ACT, // Pasa la cédula como parte de los datos
          lecAnterior: rowData.LEC_ANT,
          metodo: this.cargarDatos()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Hola:', result);
          this.cargarDatos();
        }
      });
    } else if (acciones.icon === 'delete') {
      console.log('Eliminando fila:', rowData);

      // Aquí puedes agregar la lógica para confirmar y realizar la eliminación
      const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar esta fila?');

      if (confirmarEliminacion) {
        this._adminService.deleteAdminstracion(rowData.ID_DET_DIR).subscribe(
          (response) => {
            console.log('ELIMINADO éxito');
            this.cargarDatos();
          },
          (error) => {
            console.error('Error al insertar ELIMNAR:', error);
          }
        );
      }
    }
  }

  openAddEditDialog() {
    const dialogRef = this.dialog.open(IngresarEditarDirectivaComponent, {
      width: '700px',
      disableClose: true
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos(); // Cargar datos si el diálogo envió un resultado verdadero (inserción exitosa)
      }
    });
  }

  totalRecords = this.records.length
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.records.slice(skip, skip + pageSize)
  }

  doAction(action: string): void {
    switch (action) {
      case 'DOWNLOAD':
        // Implementación para descargar
        break;
      case 'NEW':
        this.openAddEditDialog();
        break;
    }
  }
}
