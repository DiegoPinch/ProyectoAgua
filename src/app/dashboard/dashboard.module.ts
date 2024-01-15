import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { DashfacturasComponent } from './dashfacturas/dashfacturas.component';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { SharedtableModule } from '../sharedtable/sharedtable.module';

@NgModule({
  declarations: [
    PrincipalComponent,
    DashfacturasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule,
    SharedtableModule,
   
  ],
  exports: [
    PrincipalComponent,
    DashfacturasComponent,
    
  ]
})
export class DashboardModule { }
