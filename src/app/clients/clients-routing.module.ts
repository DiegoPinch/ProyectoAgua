import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListClientsComponent } from './pages/page-list-clients/page-list-clients.component';
import { PrincipalComponent } from './page-inicio/principal/principal.component';
import { MedidoresListComponent } from './medidores/medidores-list/medidores-list.component';
import { ListClientsPasivosComponent } from './pages/list-clients-pasivos/list-clients-pasivos.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent, children: [
    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
    { path: 'usuarios', component: PageListClientsComponent },
    { path: 'medidores', component: MedidoresListComponent },
    { path: 'usuariosPasivos', component: ListClientsPasivosComponent},
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
