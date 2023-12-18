import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ServiceObtenerFacService } from '../../service/service-obtener-fac.service';
import { FechahoraService } from 'src/app/services/time/fechahora.service';
import { MatDialog } from '@angular/material/dialog';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { AuthService } from 'src/app/core/serve/auth.service';

@Component({
  selector: 'gst-page-dosfacturas',
  templateUrl: './page-dosfacturas.component.html',
  styleUrls: ['./page-dosfacturas.component.css']
})
export class PageDosfacturasComponent {
  records: any[] = [];
  mesesDelAnio: string[] = [];
  fechaActual!: Date;
  selectedMes: string = '';
  selectedTipo: string = '';
  
  options: string[] = ['CONSUMO', 'RIEGO'];

  metaDataColumns: MetaDataColumn[] = [
    { field: "CED_USU", title: "CEDULA" },
    { field: "NOM_USU", title: "NOMBRE" },
    { field: "APE_USU", title: "APELLIDO" },
    { field: "TIPO_MED", title: "TIPO"},
    { field: "LEC_ANT", title: "L. ANT" },
    { field: "LEC_ACT", title: "L. ACT" },
    { field: "MES_CON", title: "MES"},
    { field: "EXC_LECTURA", title: "EXCESO"},
    { field: "EST_FACT", title: "ESTADO"},
    { field: "SUM_TOTAL", title: "VALOR"},
  ];

  constructor(private _servFacturas:ServiceObtenerFacService ,
    private fechaHoraService: FechahoraService,
    private authService: AuthService,
    private dialog: MatDialog) {
    this.cargarDatos();
    this.changePage(0)
  }

  ngOnInit() {
    //obtiene la fecha desde el servidor
    this.fechaHoraService.obtenerFechaHoraActual().subscribe(
      (data: any) => {
        this.fechaActual = new Date(data.datetime);
        this.generarMesesDelAnio();
        console.log(this.fechaActual);
      },
      error => {
        console.error('Error al obtener la fecha actual:', error);
      }
    );

  }
  //sirve para setear fecha
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

  cargarDatos() {
    const usuario = this.authService.obtenerUsuario();
    const cedula = usuario!.cedula;
      this._servFacturas.getFacturas(cedula).subscribe((data: any[]) => {
        this.records = data.map(item => {
          return {
            CED_USU: item.CED_USU,
            NOM_USU: item.NOM_USU,
            APE_USU: item.APE_USU,
            TIPO_MED: item.TIPO_MED,
            LEC_ANT: item.LEC_ANT,
            LEC_ACT: item.LEC_ACT,
            MES_CON: item.MES_CON,
            EXC_LECTURA: item.EXC_LECTURA,
            EST_FACT: item.EST_FACT,
            SUM_TOTAL: item.SUM_TOTAL
          };
        });
        this.totalRecords = this.records.length;
        this.changePage(0); // Llama a changePage después de cargar los datos
      });
    
  }
  

  data: any[] = []
  totalRecords = this.records.length
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.records.slice(skip, skip + pageSize)
  }
}
