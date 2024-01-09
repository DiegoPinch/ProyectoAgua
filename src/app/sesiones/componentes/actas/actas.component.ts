import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditarComponent } from 'src/app/lecturas/page/editar/editar.component';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
import { ActasService } from '../../serve/actas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'gst-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css']
})
export class ActasComponent {
  records: any[] = [];
  links: { [key: string]: string } = {}; // Objeto para almacenar los enlaces

  formulario: FormGroup;
  selectedFileName!: string;
  data: any[] = [];

  metaDataColumns: MetaDataColumn[] = [
    { field: "ID_ACT", title: "ID" },
    { field: "DOCUMENTO", title: "DOCUMENTO" },
    { field: "OBSERVACION", title: "OBSERVACION" },
    { field: "acciones", title: "ACCIONES" }
  ];

  constructor(private renderer: Renderer2,private fb: FormBuilder, private _actasService: ActasService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.formulario = this.fb.group({
      ID_SESION_ACT: ["1", Validators.required],
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
        const blob = new Blob([new Uint8Array(item.DOCUMENTO.data)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const linkKey = `link_${item.ID_ACT}`; // Generar una clave única para cada enlace
        this.links[linkKey] = url; // Guardar el enlace en el objeto links

        return {
          ID_ACT: item.ID_ACT,
          DOCUMENTO: linkKey, // Usar la clave como referencia al enlace
          OBSERVACION: item.OBSERVACION,
          acciones: [
            { icon: 'edit', tooltip: 'Editar Acta', color: 'primary' },
            { icon: 'delete', tooltip: 'Eliminar Acta', color: 'warn' },
          ]
        };
      });
      this.totalRecords = this.records.length;
      this.changePage(0);
    });
  }

  obtenerEnlaceDescarga(clave: string): string {
    return this.links[clave] || ''; // Obtener el enlace basado en la clave
  }

  
  generarURLDescarga(datos: any): string {
    const blob = new Blob([new Uint8Array(datos.data)], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }
  generarEnlaceDescarga(url: string): string {
    return `<a href="${url}" download="documento.pdf">Descargar/Ver</a>`;
  }
  
  
  guardar(): void {
    const actaDatas = {
      ID_SESION_ACT: this.formulario.value.ID_SESION_ACT,
      DOCUMENTO: this.formulario.value.DOCUMENTO,
      OBSERVACION: this.formulario.value.OBSERVACION
    };
    this._actasService.postActas(actaDatas).subscribe(
      (response) => {
        this.showMessage('Datos insertados con éxito')
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
        width: '700px',
        data: {
          cedula: rowData.CED_USU,
          lecActual: rowData.LEC_ACT, // Pasa la cédula como parte de los datos
          lecAnterior: rowData.LEC_ANT,
          metodo: this.cargarDatos()
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cargarDatos();
          this.showMessage("Editado con éxito")
        }
      });
    } else if (acciones.icon === 'delete') {
      console.log('Eliminando fila:', rowData);
      const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar esta fila?');
      if (confirmarEliminacion) {
        this._actasService.deleteActas(rowData.ID_ACT).subscribe(
          (response) => {
            this.showMessage("Eliminado con éxito")
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

  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration })
  }

}
