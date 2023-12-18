import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLecturasComponent } from './page/page-lecturas-principal/page-lecturas.component';
import { PageIngresolecturasComponent } from './page/page-ingresolecturas/page-ingresolecturas.component';
import { PageeditarlecturasComponent } from './page/pageeditarlecturas/pageeditarlecturas.component';


const routes: Routes = [
  { path: '', component: PageLecturasComponent, children: [
    { path: '', redirectTo: 'ingresar', pathMatch: 'full' },
    { path: 'ingresar', component: PageIngresolecturasComponent },
    { path: 'editar', component: PageeditarlecturasComponent },
    
  ]}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturasRoutingModule { }
