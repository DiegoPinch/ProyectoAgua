import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditarComponent } from 'src/app/lecturas/page/editar/editar.component';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
import { ServiceObtenerFacService } from '../../service/service-obtener-fac.service';

@Component({
  selector: 'gst-dialogfactura',
  templateUrl: './dialogfactura.component.html',
  styleUrls: ['./dialogfactura.component.css']
})
export class DialogfacturaComponent {
  filasSeleccionadas: any[] = [];
  totalCarrito = 0;
  records: any[] = [];
  cedula!: string;
  nombre!: string;
  apellido!: string;

  constructor(private _servFacturas: ServiceObtenerFacService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog) {
    this.cargarDatos();
    this.changePage(0)
  }

  ngOnInit() {
    this.nombre = this.data.nombre;
    this.apellido = this.data.apellido;
   }

  metaDataColumns: MetaDataColumn[] = [
    { field: "TIPO_MED", title: "TIPO" },
    { field: "MES_CON", title: "MES" },
    { field: "LEC_ANT", title: "LEC. ANTERIOR" },
    { field: "LEC_ACT", title: "LEC. ACTUAL" },
    { field: "EXC_LECTURA", title: "EXCESO" },
    { field: "EST_FACT", title: "ESTADO FACTURA" },
    { field: "SUM_TOTAL", title: "VALOR" },
    { field: "acciones", title: "ACCIONES" }
  ];

  cargarDatos() {
    this.cedula = '0504686411';
    this._servFacturas.getFacturas(this.cedula).subscribe((data: any[]) => {
      this.records = data.map(item => {
        return {
          ID_FACT: item.ID_FACT,
          TIPO_MED: item.TIPO_MED,
          MES_CON: item.MES_CON,
          LEC_ANT: item.LEC_ANT,
          LEC_ACT: item.LEC_ACT,
          EXC_LECTURA: item.EXC_LECTURA,
          EST_FACT: item.EST_FACT,
          SUM_TOTAL: item.SUM_TOTAL,
          acciones: [
            { icon: 'shopping_cart', tooltip: 'Agregar', color: 'primary' },

          ]
        };
      });
      this.totalRecords = this.records.length;
      this.changePage(0); // Llama a changePage después de cargar los datos
    });

  }
  filtrarMetaColumnas(metaDataColumns: MetaDataColumn[]): MetaDataColumn[] {
    // Filtrar las columnas excluyendo la columna "ID"
    return metaDataColumns.filter(column => column.field !== 'ID_FACT');
  }
  
 ejecutarAccion(acciones: any, rowData: any) {
  if (acciones.icon === 'shopping_cart') {
    const filaExistente = this.filasSeleccionadas.find(item => item.ID_FACT === rowData.ID_FACT);
    
    if (!filaExistente) {
      this.filasSeleccionadas.push(rowData);
      this.totalCarrito += rowData.SUM_TOTAL;
    }else{
      alert('Esta fila ya está en el carrito.');
    }
  } 
}
eliminarDelCarrito(fila: any) {
  const indice = this.filasSeleccionadas.indexOf(fila);
  if (indice !== -1) {
    this.filasSeleccionadas.splice(indice, 1);
    this.totalCarrito -= fila.SUM_TOTAL;
  }
}

cobrar() {
  if (this.totalCarrito > 0) {
    this.filasSeleccionadas.forEach((fila) => {
      const id = fila.ID_FACT;
      console.log(id);
      this._servFacturas.putFacturas(id).subscribe(
        (response) => {
          console.log('Actualización exitosa para la fila con ID', id, response);
        },
        (error) => {
          console.error('Error en la actualización para la fila con ID', id, error);
        }
      );
      
    });
    
    this.filasSeleccionadas = [];
    this.totalCarrito = 0;

    
  }
}



  //paginacion
  datas: any[] = []
  totalRecords = this.records.length
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.datas = this.records.slice(skip, skip + pageSize)
  }

  

}

