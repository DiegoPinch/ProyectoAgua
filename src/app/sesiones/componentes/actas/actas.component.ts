import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditarComponent } from 'src/app/lecturas/page/editar/editar.component';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
import { ActasService } from '../../serve/actas.service';

@Component({
  selector: 'gst-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css']
})
export class ActasComponent {
  records: any[] = [];
  formulario: FormGroup;
  selectedFileName!: string;
  data: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: "ID_ACT", title: "ID" },
    { field: "DOCUMENTO", title: "DOCUMENTO" },
    { field: "OBSERVACION", title: "OBSERVACION" },
    { field: "acciones", title: "ACCIONES" }
  ];
  constructor(private fb: FormBuilder, private _actasService: ActasService, private dialog: MatDialog) {
    this.formulario = this.fb.group({
      ID_SESION_ACT: [null, Validators.required],
      DOCUMENTO: [null, Validators.required],
      OBSERVACION: [null, Validators.maxLength(50)],
    });
    this.cargarDatos();
    this.changePage(0)
  }

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
    this._actasService.getActas().subscribe((data: any[]) => {
      this.records = data.map(item => {
        return {
          ID_ACT: item.ID_ACT,
          DOCUMENTO: item.DOCUMENTO,
          OBSERVACION: item.OBSERVACION,
          acciones: [
            { icon: 'edit', tooltip: 'Editar Acta', color: 'primary' },
            { icon: 'delete', tooltip: 'Eliminar Acta', color: 'warn' },
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
    this._actasService.postActas(actaDatas).subscribe(
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

      const dialogRef = this.dialog.open(EditarComponent, {
        width: '300px',
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
        this._actasService.deleteActas(rowData.ID_ACT).subscribe(
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


  //paginacion
  //data: any[] = []
  totalRecords = this.records.length
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.records.slice(skip, skip + pageSize)
  }
}
