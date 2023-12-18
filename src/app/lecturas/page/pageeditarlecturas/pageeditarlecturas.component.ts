import { Component, OnInit, ViewChild } from '@angular/core';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { FechahoraService } from 'src/app/services/time/fechahora.service';
import { MatDialog } from '@angular/material/dialog';
import { ServlecturasService } from '../../servicio/servlecturas.service';
import { EditarComponent } from '../editar/editar.component';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'gst-pageeditarlecturas',
  templateUrl: './pageeditarlecturas.component.html',
  styleUrls: ['./pageeditarlecturas.component.css']
})
export class PageeditarlecturasComponent implements OnInit {
  records: any[] = [];
  mesesDelAnio: string[] = [];
  fechaActual!: Date;
  selectedMesResta: string ='';
  selectedMes: string = '';
  selectedTipo: string = 'CONSUMO';
  options: string[] = ['CONSUMO', 'RIEGO'];
  showSpinner: boolean = false;
  showSpinnerA: boolean = false;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatTableDataSource) dataTable!: MatTableDataSource<any>;

  metaDataColumns: MetaDataColumn[] = [
    { field: "CED_USU", title: "CEDULA" },
    { field: "NOM_USU", title: "NOMBRE" },
    { field: "APE_USU", title: "APELLIDO" },
    { field: "LEC_ANT", title: "LEC. ANTERIOR" },
    { field: "LEC_ACT", title: "LEC. ACTUAL" },
    { field: "MES_CON", title: "MES" },
    { field: "acciones", title: "ACCIONES" }
  ];

  constructor(private _servLecturas: ServlecturasService, private fechaHoraService: FechahoraService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>(this.records);
    this.cargarDatos();
    this.changePage(0)
  }

  ngOnInit() {
    this.showSpinnerA = true;
    this.fechaHoraService.obtenerFechaHoraActual().subscribe(
      (data: any) => {
        this.fechaActual = new Date(data.datetime);
        this.generarMesesDelAnio();
        this.selectedMes = this.getMesActual(); 
        this.cargarDatos();
        this.showSpinnerA = false;
      },
      error => {
        console.error('Error al obtener la fecha actual:', error);
      }
    );
  }

  generarMesesDelAnio() {
    const año = this.fechaActual.getFullYear();
    const meses = [
      'ENERO',
      'FEBRERO',
      'MARZO',
      'ABRIL',
      'MAYO',
      'JUNIO',
      'JULIO',
      'AGOSTO',
      'SEPTIEMBRE',
      'OCTUBRE',
      'NOVIEMBRE',
      'DICIEMBRE'
    ];
  
    this.mesesDelAnio = meses.map(mes => `${año}-${mes}`);
  }
  
  getMesActual() {
    const año = this.fechaActual.getFullYear();
    const mes = this.fechaActual.getMonth(); // Los meses en JavaScript empiezan desde 0
    const meses = [
      'ENERO',
      'FEBRERO',
      'MARZO',
      'ABRIL',
      'MAYO',
      'JUNIO',
      'JULIO',
      'AGOSTO',
      'SEPTIEMBRE',
      'OCTUBRE',
      'NOVIEMBRE',
      'DICIEMBRE'
    ];
    return `${año}-${meses[mes]}`;
  }

  cargarDatos() {
    this.showSpinner = true;
    const opcionSeleccionada = this.selectedTipo;
    const opcionMes = this.selectedMes;
    if (opcionSeleccionada) {  
      this._servLecturas.getLecturas(opcionSeleccionada, opcionMes).subscribe((data: any[]) => {
        this.records = data.map(item => {
          return {
            CED_USU: item.CED_USU,
            NOM_USU: item.NOM_USU,
            APE_USU: item.APE_USU,
            LEC_ANT: item.LEC_ANT,
            LEC_ACT: item.LEC_ACT, 
            MES_CON: item.MES_CON, 
            ID_LEC : item.ID_LEC,
            TIPO_MED: item.TIPO_MED,
            acciones: [
              { icon: 'edit', tooltip: 'Editar Lectura', color: 'primary' },
            ]
          };
        });
        this.dataSource = new MatTableDataSource<any>(this.records);
        this.totalRecords = this.records.length;
        this.changePage(0); 
        this.showSpinner = false;
      });
    }
  }
  
  ejecutarAccion(acciones: any, rowData: any) {
    if (acciones.icon === 'edit') {
      const dialogRef = this.dialog.open(EditarComponent, {
        data: {
          rowData: rowData,
          selectedTipo: this.selectedTipo,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarDatos()
      });
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue; // Aplica el filtro a la fuente de datos
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }
  
  data: any[] = []
  totalRecords = this.records.length
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.records.slice(skip, skip + pageSize)
  }
}
