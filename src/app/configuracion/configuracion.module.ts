import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SharedtableModule } from '../sharedtable/sharedtable.module';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfTarifaguaComponent } from './conf-tarifagua/conf-tarifagua.component';
import { ConfTarifaMultaComponent } from './conf-tarifa-multa/conf-tarifa-multa.component';


@NgModule({
  declarations: [ConfiguracionComponent, ConfTarifaguaComponent, ConfTarifaMultaComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    SharedModule,
    SharedtableModule
  ],
  exports: [
    ConfiguracionComponent,
    ConfTarifaguaComponent,
    ConfTarifaMultaComponent
  ]


})
export class ConfiguracionModule { }
