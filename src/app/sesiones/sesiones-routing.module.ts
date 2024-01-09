import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagePrincialSesionesComponent } from './page/page-princial-sesiones/page-princial-sesiones.component';
import { ActasComponent } from './componentes/actas/actas.component';
import { SesionesComponent } from './componentes/sesiones/sesiones.component';
import { MingasComponent } from './componentes/mingas/mingas.component';

const routes: Routes = [
  { path: '', component: PagePrincialSesionesComponent, children: [
    { path: '', redirectTo: 'sesiones', pathMatch: 'full' },
    { path: 'actas', component: ActasComponent },
    { path: 'mingas', component: MingasComponent},
    { path: 'sesiones', component: SesionesComponent},
    
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionesRoutingModule { }
