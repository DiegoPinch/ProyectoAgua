import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { PageInicioComponent } from './pages/page-inicio/page-inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { LoguinComponent } from './components/loguin/loguin.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { SharedModule } from '../shared/shared.module';
import { AbrirDialogoComponent } from './components/abrir-dialogo/abrir-dialogo.component';
import { SharedtableModule } from '../sharedtable/sharedtable.module';


@NgModule({
  declarations: [
    PageInicioComponent,
    HeaderComponent,
    LoguinComponent,
    MenuComponent,
    InicioComponent,
    NosotrosComponent,
    ServiciosComponent,
    FooterComponent,
    AbrirDialogoComponent,
    
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule, 
    SharedtableModule
  ],
  exports: [
    PageInicioComponent,
    HeaderComponent,
    LoguinComponent,
    MenuComponent,
    FooterComponent,
    AbrirDialogoComponent,
    
  ]
})
export class CoreModule {
  
  
 }
