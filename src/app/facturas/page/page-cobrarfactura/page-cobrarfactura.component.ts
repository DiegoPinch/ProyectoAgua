import { Component } from '@angular/core';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
import { ServiceObtenerFacService } from '../../service/service-obtener-fac.service';
import { forkJoin } from 'rxjs';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { ServpersonaService } from 'src/app/clients/pages/modelo/persona/servpersona.service';

@Component({
  selector: 'gst-page-cobrarfactura',
  templateUrl: './page-cobrarfactura.component.html',
  styleUrls: ['./page-cobrarfactura.component.css']
})
export class PageCobrarfacturaComponent {
  filasSeleccionadas: any[] = [];
  totalCarrito = 0;
  records: any[] = [];
  cedula!: string;
  datos: any[] = [];
  nombresApellidos: string[] = [];
  filaActual: number = 0;
  mesActual!: string;
  showSpinner: boolean = false;
  constructor(public dialog: MatDialog,
    private _servFacturas: ServiceObtenerFacService,
    private _servPersona: ServpersonaService) {
    this.cargarDatos();
    this.changePage(0);

  }

  ngOnInit() {
    this.showSpinner = true
    this._servPersona.getPersonaNormal().subscribe((data: any[]) => {
      this.datos = data;
      this.nombresApellidos = this.datos.map(item => item.APE_USU + ' ' + item.NOM_USU);
      this.actualizarCedulaActual();
      this.cargarDatos();
      this.showSpinner = false
    });
  }

  actualizarCedulaActual() {
    this.cedula = this.datos[this.filaActual]?.CED_USU;

  }

  cambiarFila(siguiente: boolean) {
    
    if (siguiente) {
      if (this.filaActual < this.nombresApellidos.length - 1) {
        this.filaActual++;
       
      }
    } else {
      if (this.filaActual > 0) {
        this.filaActual--;
        
      }
    }
    
    this.actualizarCedulaActual();
    this.cargarDatos();
    this.filasSeleccionadas = [];
    this.totalCarrito = 0;
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
    this.showSpinner =true;
    if (this.cedula) {
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
        this.changePage(0);
        this.showSpinner =false;
      });
    }
  }

  filtrarMetaColumnas(metaDataColumns: MetaDataColumn[]): MetaDataColumn[] {
    return metaDataColumns.filter(column => column.field !== 'ID_FACT');
  }

  agrgarCarrito(acciones: any, rowData: any) {
    if (acciones.icon === 'shopping_cart') {
      const filaExistente = this.filasSeleccionadas.find(item => item.ID_FACT === rowData.ID_FACT);

      if (!filaExistente) {
        this.filasSeleccionadas.push(rowData);
        this.totalCarrito += rowData.SUM_TOTAL;
      } else {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filteredData = this.datos.filter(item => {
      const fullName = `${item.APE_USU.toLowerCase()} ${item.NOM_USU.toLowerCase()}`;
      return (
        item.CED_USU.toLowerCase().includes(filterValue) ||
        fullName.includes(filterValue)
      );
    });
  
    this.nombresApellidos = filteredData.map(item => item.APE_USU + ' ' + item.NOM_USU);
  
    const nuevaFila = this.nombresApellidos.indexOf(this.datos[this.filaActual].APE_USU + ' ' + this.datos[this.filaActual].NOM_USU);
    if (nuevaFila !== -1) {
      this.filaActual = nuevaFila;
      this.actualizarCedulaYDatos(); // Cargar datos con la cédula actualizada
    }
  }
  
  actualizarCedulaYDatos() {
    this.cedula = this.datos[this.filaActual]?.CED_USU;
    this.cargarDatos();
  }

  cobrar() {
    const dialogRef = this.dialog.open(AbrirDialogoComponent, {
      data: {
        title: 'Confirmar Cobro',
        message: '¿Estás seguro de que deseas realizar el cobro?'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSpinner =true;
        if (this.totalCarrito > 0) {
          const updateObservables = this.filasSeleccionadas.map((fila) => {
            const id = fila.ID_FACT;
            return this._servFacturas.putFacturas(id);
          });
          forkJoin(updateObservables).subscribe(
            (responses) => {
              console.log('Todas las actualizaciones exitosas');
              this.cargarDatos();
              const facturasProcesadas = new Set<string>();
              const facturasURLs = [];
              for (const fila of this.filasSeleccionadas) {
                const mes = fila.MES_CON;
                const tipo = fila.TIPO_MED;
                facturasProcesadas.add(mes);
                facturasURLs.push(this.obtenerFacturaURL(this.cedula, mes, tipo));
              }
              forkJoin(facturasURLs).subscribe(
                async (urls) => {
                  const pdfDoc = await this.fusionarFacturas(urls);
                  const pdfBytes = await pdfDoc.save();
                  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                  saveAs(blob, 'facturas.pdf');
                  this.filasSeleccionadas = [];
                  this.totalCarrito = 0;
                  this.showSpinner =false;
                },
                (error) => {
                  console.error('Error al obtener URLs de facturas');
                  this.showSpinner =false;
                }
              );
            },
            (error) => {
              console.error('Error en alguna de las actualizaciones');
              this.showSpinner =false;
            }
          );
        }
      }
    });
  }


  async fusionarFacturas(urls: string[]): Promise<PDFDocument> {
    const pdfDoc = await PDFDocument.create();
    for (const url of urls) {
      try {
        const fetchedPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
        const pdf = await PDFDocument.load(fetchedPdfBytes);
        const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          pdfDoc.addPage(page);
        });
      } catch (error) {
        console.error('Error al procesar factura individual', error);
      }
    }
    return pdfDoc;
  }

  async obtenerFacturaURL(cedula: string, mes: string, tipo: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._servFacturas.getImprimirFacturas(cedula, mes, tipo).subscribe(
        (data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          resolve(url);
        },
        (error) => {
          console.error('Error al obtener URL de factura', error);
          reject(error);
        }
      );
    });
  }

  datas: any[] = []
  totalRecords = this.records.length
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.datas = this.records.slice(skip, skip + pageSize)
  }

}
