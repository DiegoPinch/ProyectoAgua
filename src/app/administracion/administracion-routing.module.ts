import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionModule } from './administracion.module';
import { PrincipalComponent } from './page/principal/principal.component';
import { DirectivaComponent } from './componentes/directiva/directiva.component';
import { BienesComponent } from './componentes/bienes/bienes.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent, children: [
    { path: '', redirectTo: 'directiva', pathMatch: 'full' },
    { path: 'directiva', component: DirectivaComponent },
    { path: 'bienes', component: BienesComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
