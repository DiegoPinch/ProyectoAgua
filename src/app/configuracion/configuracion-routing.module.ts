import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfTarifaguaComponent } from './conf-tarifagua/conf-tarifagua.component';
import { ConfTarifaMultaComponent } from './conf-tarifa-multa/conf-tarifa-multa.component';

const routes: Routes = [
  { path: '', component: ConfiguracionComponent, children: [
    { path: '', redirectTo: 'tarifaAgua', pathMatch: 'full' },
    { path: 'tarifaAgua', component: ConfTarifaguaComponent },
    { path: 'tarifaMulta', component: ConfTarifaMultaComponent },
    
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
