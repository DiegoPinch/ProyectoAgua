import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { NosotrosComponent } from './core/components/nosotros/nosotros.component';
import { ServiciosComponent } from './core/components/servicios/servicios.component';
import { AuthGuard } from './core/serve/auth.guard';
import { PageCobrarfacturaComponent } from './facturas/page/page-cobrarfactura/page-cobrarfactura.component';



const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'servicios',
    component: ServiciosComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
      },
      {
        path: 'clientes',
        loadChildren: () => import('./clients/clients.module').then((m) => m.ClientsModule),
        
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR'] },
        
      },
      {
        path: 'lecturas',
        loadChildren: () => import('./lecturas/lecturas.module').then((m) => m.LecturasModule),
        
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR', 'LECTOR'] },
        
      },
      {
        path: 'facturas',
        loadChildren: () => import('./facturas/facturas.module').then((m) => m.FacturasModule),
        
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR','TESORERO','SECRETARIO','CLIENTE']},
        
      },
      {
        path: 'sesiones', //es actas
        loadChildren: () => import('./sesiones/sesiones.module').then((m) => m.SesionesModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR','SECRETARIO'] },
      },
      {
        path: 'administracion',
        loadChildren: () => import('./administracion/administracion.module').then((m) => m.AdministracionModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR'] },
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./configuracion/configuracion.module').then((m) => m.ConfiguracionModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR'] },
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
