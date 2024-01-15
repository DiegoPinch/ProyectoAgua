import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { DashfacturasComponent } from './dashfacturas/dashfacturas.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent, children: [
      { path: '', redirectTo: 'dashboardFacturas', pathMatch: 'full' },
      { path: 'dashboardFacturas', component: DashfacturasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
