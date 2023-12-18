import { Component } from '@angular/core';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { ServpersonaService } from '../modelo/persona/servpersona.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'gst-list-clients-pasivos',
  templateUrl: './list-clients-pasivos.component.html',
  styleUrls: ['./list-clients-pasivos.component.css']
})
export class ListClientsPasivosComponent {
  
  data: any[] = []
  records: any[] = [];
  dataSource = new MatTableDataSource();
  metaDataColumns: MetaDataColumn[] = [
    { field: "CED_USU", title: "CEDULA" },
    { field: "NOM_USU", title: "NOMBRE" },
    { field: "APE_USU", title: "APELLIDO" },
    {field: "ESTADO", title: "ESTADO"},
    { field: "acciones", title: "ACCIONES" }
  ];
  
  totalRecords: number = 0;
  constructor(
    private _servPersona: ServpersonaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<any>(this.records);
    this.cargarDatos();
    this.changePage(0)
  }
  
  cargarDatos() {
    this._servPersona.getPersonasPasivos().subscribe((data: any[]) => {
      this.records = this.formatData(data);
        this.dataSource = new MatTableDataSource<any>(this.records);
        this.totalRecords = this.records.length;
        this.changePage(0);
      
    });
  }

  private formatData(data: any[]): any[] {
    return data.map(item => ({
      CED_USU: item.CED_USU,
      NOM_USU: item.NOM_USU,
      APE_USU: item.APE_USU,
      ESTADO: item.ESTADO,
      acciones: [
        { icon: 'power', tooltip: 'Activar Usuario', color: 'primary' },
      ]
    }));
  }
  
  
  ejecutarAccion(acciones: any, rowData: any) {
    console.log(rowData);
    if (acciones.icon === 'power') {
      console.log(rowData);
      const dialogRef = this.dialog.open(AbrirDialogoComponent, {
        data: {
          title: 'Aviso',
          message: '¿Estás seguro de hacer el reingreso para éste usuario?'
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._servPersona.reingresoPersona(rowData.CED_USU).subscribe((data: any[]) => {
            this.cargarDatos();
            this.showMessage('Reingreso de usuario con exito')
          });
        }
      })
    }
  }

  

  eliminarPersona(rowData: any) {
    
  }
  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration })
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.dataSource = new MatTableDataSource<any>(this.records.slice(skip, skip + pageSize));
  }

}
