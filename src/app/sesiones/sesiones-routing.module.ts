import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagePrincialSesionesComponent } from './page/page-princial-sesiones/page-princial-sesiones.component';

const routes: Routes = [
  {
    path: '',
    component: PagePrincialSesionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionesRoutingModule { }
