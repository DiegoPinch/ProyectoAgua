import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';
import { AbrirDialogoComponent } from 'src/app/core/components/abrir-dialogo/abrir-dialogo.component';
import { KeypadButton } from 'src/app/sharedtable/interfaces/keypadbutton.interfaces';
import { ServpersonaService } from '../modelo/persona/servpersona.service';
import { Persona } from '../modelo/persona/interfaces/persona';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'gst-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.css']
})
export class PageListClientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['CED_USU', 'NOM_USU', 'APE_USU', 'TEL_USU', 'CORREO_USU', 'ESTADO', 'acciones'];
  dataSource = new MatTableDataSource<Persona>();
  loading: boolean = false;
  showSpinner: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "person_add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  constructor( public dialog: MatDialog, private _personaService: ServpersonaService, private snackBar: MatSnackBar) {
    
  }

  

  ngOnInit(): void {
    this.obtenerPersona();
  }

  obtenerPersona(): void {
    this.loading = true;
    this.showSpinner = true; 
    this._personaService.getPersonas().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.setDataSourceAttributes();
      this.showSpinner = false; 
    });
  }

  setDataSourceAttributes(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletePersona(id: string): void {
    this.loading = true;
    this.showSpinner = true;
    this._personaService.eliminarPersona(id).subscribe(() => {
      this.obtenerPersona();
      this.showSpinner = false;
    });
  }

  openConfirmDialog(id: string): void {
    const dialogRef = this.dialog.open(AbrirDialogoComponent, {
      data: {
        title: 'Eliminar Persona',
        message: '¿Estás seguro de que deseas eliminar esta persona?'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePersona(id);
        this.showMessage("Persona Eliminada con éxito")
      }
    });
  }
  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration })
    
  }

  ngAfterViewInit(): void {
    this.setDataSourceAttributes();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditPerson(): void {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '700px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerPersona();
    });
  }

  openAddEditDialog(persona: Persona | null = null): void {
    const isEdit = persona !== null;
    
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '700px',
      data: { persona, isEdit },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerPersona();
      
    });

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
