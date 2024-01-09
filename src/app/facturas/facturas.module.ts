import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasRoutingModule } from './facturas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SharedtableModule } from '../sharedtable/sharedtable.module';
import { PageCobrarfacturaComponent } from './page/page-cobrarfactura/page-cobrarfactura.component';
import { PageImprimirfacturaComponent } from './page/page-imprimirfactura/page-imprimirfactura.component';
import { PageDosfacturasComponent } from './page/page-verfacturas/page-dosfacturas.component';
import { DialogfacturaComponent } from './page/dialogfactura/dialogfactura.component';
import { PageFacturasComponent } from './page/page-facturas/page-facturas.component';


@NgModule({
  declarations: [
    PageFacturasComponent,
    PageCobrarfacturaComponent,
    PageImprimirfacturaComponent,
    PageDosfacturasComponent,
    DialogfacturaComponent,
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    SharedModule,
    SharedtableModule,
  ],
  exports: [
    PageFacturasComponent,
    PageCobrarfacturaComponent,
    PageImprimirfacturaComponent,
    PageDosfacturasComponent,
    DialogfacturaComponent,
  ]
})
export class FacturasModule { }
