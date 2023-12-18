import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageImprimirfacturaComponent } from './page/page-imprimirfactura/page-imprimirfactura.component';
import { PageFacturasComponent } from './page/page-facturas/page-facturas.component';
import { PageCobrarfacturaComponent } from './page/page-cobrarfactura/page-cobrarfactura.component';
import { AuthGuard } from '../core/serve/auth.guard';
import { PageDosfacturasComponent } from './page/page-verfacturas/page-dosfacturas.component';

const routes: Routes = [
  { path: '', component: PageFacturasComponent, children: [
    { path: '', redirectTo: 'cobrarFacturas', pathMatch: 'full' },
    { path: 'cobrarFacturas', component: PageCobrarfacturaComponent },
    { path: 'verFacturas', component: PageDosfacturasComponent },
    
  ]}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
