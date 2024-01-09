import { Component } from '@angular/core';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
import { ServiceMedidores } from '../service/service-medidores';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeypadButton } from 'src/app/sharedtable/interfaces/keypadbutton.interfaces';
import { IngresoEditMedidorComponent } from '../ingreso-edit-medidor/ingreso-edit-medidor.component';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'gst-medidores-list',
  templateUrl: './medidores-list.component.html',
  styleUrls: ['./medidores-list.component.css']
})

export class MedidoresListComponent {
  showSpinner: boolean = false;
  data: any[] = []
  records: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: "CED_USU", title: "CEDULA" },
    { field: "NOMBRE_COMPLETO", title: "NOMBRE Y APELLIDO" },
    { field: "TIPO_MED", title: "TIPO" },
    { field: "MARCA_MED", title: "MARCA" },
    { field: "OBS_MED", title: "OBSERVACIÓN" },
    { field: "AÑO_INGRESO", title: "AÑO DE INGRESO" },
    { field: "CODIGO_QR", title: "CODIGO QR" },
    { field: "LEC_ING", title: "LEC. INGRESO" },
    { field: "acciones", title: "ACCIONES" }
  ];

  totalRecords: number = 0;
  dataSource!: MatTableDataSource<any>;
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  constructor(
    private _servMedidores: ServiceMedidores,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<any>(this.records);
    this.cargarDatos();
    this.changePage(0)
  }

  cargarDatos() {
    this.showSpinner = true;
    this._servMedidores.getMedidores().subscribe((data: any[]) => {
      this.records = data.map(item => this.transformarDatos(item));
      this.totalRecords = this.records.length;
      this.changePage(0);
      this.showSpinner = false;
    });
  }

  transformarDatos(item: any): any {
    return {
      CED_USU: item.CED_USU,
      TIPO_MED: item.TIPO_MED,
      ID_MED: item.ID_MED,
      NOMBRE_COMPLETO: `${item.APE_USU} ${item.NOM_USU}`,
      MARCA_MED: item.MARCA_MED,
      OBS_MED: item.OBS_MED,
      AÑO_INGRESO: this.formatearFecha(item.AÑO_INGRESO),
      CODIGO_QR: item.CODIGO_QR,
      LEC_ING: item.LEC_ING,
      acciones: [
        { icon: 'edit', tooltip: 'Editar', color: 'primary' },
        { icon: 'delete', tooltip: 'Eliminar', color: 'warn' },
      ]
    };

  }

  ingresarMedidor(row: any = null) {
    const dialogRef: MatDialogRef<IngresoEditMedidorComponent> = this.dialog.open(IngresoEditMedidorComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        formData.ESTADO = 'ACTIVO';
        formData.CODIGO_QR = 'NULL';
        this._servMedidores.ingresarMedidor(formData).subscribe(
          (respuesta) => {
            this.cargarDatos();
            this.showMessage('Se ha ingresado un medidor')
          },
          (error) => {
            // Manejo de errores
            this.showMessage("Error de servidor...");
          }
        );
      }
    });
  }

  ejecutarAccion(acciones: any, rowData: any) {
    if (acciones.icon === 'edit') {
      this.editarMedidor(rowData);
    } else if (acciones.icon === 'delete') {
      this.eliminarMedidor(rowData);
    }
  }

  editarMedidor(rowData: any) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: {
        isEdit: true,
        rowData: rowData
      }
    };
    const dialogRef: MatDialogRef<IngresoEditMedidorComponent> = this.dialog.open(IngresoEditMedidorComponent, options);
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this._servMedidores.editarMedidor(rowData.ID_MED, formData).subscribe(
          (respuesta) => {
            this.cargarDatos()
            this.showMessage('Editado correctamente')
          },
          (error) => {
            // Manejo de errores
          }
        );
      }
    });
  }

  eliminarMedidor(rowData: any) {
    const dialogRef = this.dialog.open(AbrirDialogoComponent, {
      data: {
        title: 'AVISO',
        message: '¿Estás seguro de que deseas eliminar?'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._servMedidores.eliminarMedidor(rowData.ID_MED).subscribe((data: any[]) => {
          this.cargarDatos();
          this.showMessage('Se ha eliminado el medidor')
        });
      }
    })
  }

  pasardatos(personaDatas: any) {
    const dialogRef = this.dialog.open(IngresoEditMedidorComponent, {
      data: { personaDatas },

    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        console.log(formData);
        formData.ESTADO = 'ACTIVO';
        formData.CODIGO_QR = 'NULL';
        this._servMedidores.ingresarMedidor(formData).subscribe(
          (respuesta) => {
            this.showMessage('Se ha ingresado un medidor')
          },
          (error) => {
            // Manejo de errores
          }
        );
      }else{
        console.log("nose ");
      }
    });
  }

  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration })
  }

  formatearFecha(fecha: string): string {
    const fechaActual = new Date(fecha);
    const year = fechaActual.getFullYear();
    const month = `${fechaActual.getMonth() + 1}`.padStart(2, '0');
    const day = `${fechaActual.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filteredData = this.records.filter(item =>
      item.CED_USU.toLowerCase().includes(filterValue) ||
      item.NOMBRE_COMPLETO.toLowerCase().includes(filterValue)

    );
    this.dataSource = new MatTableDataSource<any>(filteredData);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.dataSource = new MatTableDataSource<any>(this.records.slice(skip, skip + pageSize));
  }
  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        // Implementación para descargar
        break;
      case 'NEW':
        this.ingresarMedidor();
        break;
    }
  }
}
