import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SesionesRoutingModule } from './sesiones-routing.module';
import { PagePrincialSesionesComponent } from './page/page-princial-sesiones/page-princial-sesiones.component';
import { ActasComponent } from './componentes/actas/actas.component';
import { SharedtableModule } from '../sharedtable/sharedtable.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PagePrincialSesionesComponent,
    ActasComponent
  ],
  imports: [
    CommonModule,
    SesionesRoutingModule,
    SharedtableModule,
   SharedModule
  ],
  exports: [
    PagePrincialSesionesComponent,
    ActasComponent
  ]
})
export class SesionesModule { }
