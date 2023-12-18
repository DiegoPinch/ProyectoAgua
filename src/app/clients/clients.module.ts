import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { PageListClientsComponent } from './pages/page-list-clients/page-list-clients.component';
import { SharedModule } from '../shared/shared.module';
import { AgregarEditarPersonaComponent } from './pages/agregar-editar-persona/agregar-editar-persona.component';
import { SharedtableModule } from '../sharedtable/sharedtable.module';
import { MedidoresListComponent } from './medidores/medidores-list/medidores-list.component';
import { IngresoEditMedidorComponent } from './medidores/ingreso-edit-medidor/ingreso-edit-medidor.component';
import { PrincipalComponent } from './page-inicio/principal/principal.component';
import { SpinerComponent } from '../sharedtable/components/spiner/spiner.component';
import { ListClientsPasivosComponent } from './pages/list-clients-pasivos/list-clients-pasivos.component';


@NgModule({
  declarations: [
    PageListClientsComponent,
    AgregarEditarPersonaComponent,
    MedidoresListComponent,
    IngresoEditMedidorComponent,
    PrincipalComponent,
    ListClientsPasivosComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    SharedtableModule
    
  ],
  exports: [
    MedidoresListComponent,
    IngresoEditMedidorComponent,
    PrincipalComponent,
    ListClientsPasivosComponent
  ]
})
export class ClientsModule { }
