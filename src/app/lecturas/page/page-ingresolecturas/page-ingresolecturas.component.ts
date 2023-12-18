import { Component, OnInit } from '@angular/core';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
import { FechahoraService } from 'src/app/services/time/fechahora.service';
import { IngresarEditarComponent } from '../ingresar/ingresar-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { es } from 'date-fns/locale';
import { format, subMonths } from 'date-fns';
import { ServlecturasService } from '../../servicio/servlecturas.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'gst-page-ingresolecturas',
  templateUrl: './page-ingresolecturas.component.html',
  styleUrls: ['./page-ingresolecturas.component.css']
})
export class PageIngresolecturasComponent implements OnInit {
  records: any[] = [];
  mesesDelAnio: string[] = [];
  fechaActual!: Date;
  selectedMesResta: string = '';
  selectedMes: string = '';
  defaultMes: string = '';
  selectedTipo: string = 'CONSUMO';
  options: string[] = ['CONSUMO', 'RIEGO'];
  dataSource!: MatTableDataSource<any>;
  showSpinner: boolean = false;
  showSpinnerA: boolean = false;
  metaDataColumns: MetaDataColumn[] = [
    { field: "CED_USU", title: "CEDULA" },
    { field: "NOM_USU", title: "NOMBRE" },
    { field: "APE_USU", title: "APELLIDO" },
    { field: "acciones", title: "ACCIONES" }
  ];

  constructor(
    private _lecturaService: ServlecturasService,
    private fechaHoraService: FechahoraService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFechaHoraActual();
  }

  cargarDatos() {
    this.showSpinner =true
    const opcionSeleccionada = this.selectedTipo;
    if (opcionSeleccionada) {
      this._lecturaService.getPersonaMedidor(opcionSeleccionada).subscribe((data: any[]) => {
        this.records = this.formatData(data);
        this.dataSource = new MatTableDataSource<any>(this.records);
        this.totalRecords = this.records.length;
        this.changePage(0);
        this.showSpinner =false
      });
    }
  }
  ejecutarAccion(acciones: any, rowData: any) {
    if (acciones.icon === 'input') {
      const dialogRef = this.dialog.open(IngresarEditarComponent, {
        data: {
          rowData: rowData,
          selectedTipo: this.selectedTipo,
          selectedMes: this.selectedMes,
          selectedMesResta: this.selectedMesResta,
          defaultMes: this.defaultMes
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Datos editados:');
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.dataSource.data = this.records.slice(skip, skip + pageSize);
  }

  private getFechaHoraActual() {
    this.showSpinnerA = true
    this.fechaHoraService.obtenerFechaHoraActual().subscribe(
      (data: any) => {
        this.fechaActual = new Date(data.datetime);
        this.generarMesesDelAnio();
        this.selectedMes = this.getMesActual(); 
        this.defaultMes = this.getMesActual();
        this.restarUnMes(this.selectedMes);
        this.cargarDatos();
        this.showSpinnerA = false
      },
      error => {
        console.error('Error al obtener la fecha actual:', error);
      }
    );
  }
  esMesPosterior(mes: string): boolean {
    const añoActual = this.fechaActual.getFullYear();
    const mesActual = this.fechaActual.getMonth() + 1; 
    const [añoSeleccionado, mesSeleccionado] = mes.split('-');
    const mesSeleccionadoNumero = obtenerNumeroDeMes(mesSeleccionado);
  
    if (+añoSeleccionado > añoActual || (+añoSeleccionado === añoActual && mesSeleccionadoNumero > mesActual)) {
      return true; 
    }
  
    return false;
  }
  private generarMesesDelAnio() {
    const año = this.fechaActual.getFullYear();
    const meses = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',
      'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
  
    this.mesesDelAnio = meses.map(mes => `${año}-${mes}`);
  }
  
  private getMesActual() {
    const año = this.fechaActual.getFullYear();
    const mes = this.fechaActual.getMonth();
    const meses = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',
      'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    return `${año}-${meses[mes]}`;
  }

  public restarUnMes(nuevoValor: string) {
    if (nuevoValor) {
      const [año, mes] = nuevoValor.split('-');
      const fechaSeleccionada = new Date(parseInt(año), obtenerNumeroDeMes(mes) - 1, 1);
      const fechaRestada = subMonths(fechaSeleccionada, 1);
      this.selectedMesResta = format(fechaRestada, 'yyyy-MMMM', { locale: es }).toUpperCase();
    }
  }

  private formatData(data: any[]): any[] {
    return data.map(item => ({
      CED_USU: item.CED_USU,
      NOM_USU: item.NOM_USU,
      APE_USU: item.APE_USU,
      ID_MED : item.ID_MED,
      acciones: [
        { icon: 'input', tooltip: 'Ingresar Lectura', color: 'primary' },
      ]
    }));
  }
  
  totalRecords = 0;
}

function obtenerNumeroDeMes(mes: string) {
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO',
    'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  return meses.indexOf(mes) + 1;
}
