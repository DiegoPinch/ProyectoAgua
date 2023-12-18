import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageInicioComponent } from './pages/page-inicio/page-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: PageInicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
