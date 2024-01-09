import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionesRoutingModule } from './sesiones-routing.module';
import { PagePrincialSesionesComponent } from './page/page-princial-sesiones/page-princial-sesiones.component';
import { ActasComponent } from './componentes/actas/actas.component';
import { SharedtableModule } from '../sharedtable/sharedtable.module';
import { SharedModule } from '../shared/shared.module';
import { SesionesComponent } from './componentes/sesiones/sesiones.component';
import { MingasComponent } from './componentes/mingas/mingas.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PagePrincialSesionesComponent,
    ActasComponent,
    SesionesComponent,
    MingasComponent,
  ],
  imports: [
    CommonModule,
    SesionesRoutingModule,
    SharedtableModule,
    SharedModule,

  ],
  exports: [
    PagePrincialSesionesComponent,
    ActasComponent,
    SesionesComponent,
    MingasComponent,

  ]
})
export class SesionesModule { }
