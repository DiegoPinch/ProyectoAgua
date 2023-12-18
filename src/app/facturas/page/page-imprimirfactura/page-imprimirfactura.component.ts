import { Component } from '@angular/core';
import { Persona } from 'src/app/clients/pages/modelo/persona/interfaces/persona';
import { ServpersonaService } from 'src/app/clients/pages/modelo/persona/servpersona.service';
import { MetaDataColumn } from 'src/app/sharedtable/interfaces/metacolumn.interfaces';
import { environment } from 'src/environments/environments';
@Component({
  selector: 'gst-page-imprimirfactura',
  templateUrl: './page-imprimirfactura.component.html',
  styleUrls: ['./page-imprimirfactura.component.css']
})
export class PageImprimirfacturaComponent {
  records: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: "CED_USU", title: "CEDULA" },
    { field: "NOM_USU", title: "NOMBRE" },
    { field: "APE_USU", title: "APELLIDO" },
    { field: "TEL_USU", title: "TELEFONO" },
    { field: "CORREO_USU", title: "CORREO" },
    { field: "ESTADO", title: "ESTADO" },
    { field: "acciones", title: "ACCIONES" }
  ];

  constructor(private _personaService: ServpersonaService) {
    this.changePage(0)
  }

  ngOnInit(): void {
    this.obtenerPersona();
  }

  obtenerPersona() {
    this._personaService.getPersonas().subscribe((data: Persona[]) => {
      this.records = data.map(persona => {
        return {
          CED_USU: persona.CED_USU,
          NOM_USU: persona.NOM_USU,
          APE_USU: persona.APE_USU,
          TEL_USU: persona.TEL_USU,
          CORREO_USU: persona.CORREO_USU,
          ESTADO: persona.ESTADO,
          acciones: [
            { icon: 'edit', tooltip: 'Editar', color: 'primary' },
            { icon: 'delete', tooltip: 'Eliminar', color: 'warn' },
            
          ]
        };
      });
    
      this.totalRecords = this.records.length;
      this.changePage(0); 
    });
  }
  
  ejecutarAccion(acciones: any, rowData: any) {
    if (acciones.icon === 'edit') {
      // Aquí maneja la acción de "Editar"
      console.log('Editando fila:', rowData);
      // Puedes abrir un modal de edición o navegar a una página de edición, por ejemplo.
    } else if (acciones.icon === 'delete') {
      // Aquí maneja la acción de "Eliminar"
      console.log('Eliminando fila:', rowData);
      // Puedes mostrar un modal de confirmación de eliminación o realizar la eliminación directamente.
    }
  }
  
  //paginacion
  data:any[] = []
  totalRecords = this.records.length
  changePage(page: number){
    const pageSize =environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.records.slice(skip, skip + pageSize)
  }
}
