import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionModule } from './administracion.module';
import { PrincipalComponent } from './page/principal/principal.component';

const routes: Routes = [
  {
    path:'',
    component:  PrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
