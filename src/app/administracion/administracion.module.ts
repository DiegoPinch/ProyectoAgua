import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { PrincipalComponent } from './page/principal/principal.component';
import { DirectivaComponent } from './componentes/directiva/directiva.component';
import { BienesComponent } from './componentes/bienes/bienes.component';
import { SharedtableModule } from '../sharedtable/sharedtable.module';
import { SharedModule } from '../shared/shared.module';
import { IngresarEditarDirectivaComponent } from './componentes/ingresar-editar-directiva/ingresar-editar-directiva.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    DirectivaComponent,
    BienesComponent,
    IngresarEditarDirectivaComponent,
  
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    SharedtableModule,
    SharedModule  
  ],
  exports: [
    PrincipalComponent,
    DirectivaComponent,
    BienesComponent,
    IngresarEditarDirectivaComponent,
   
  ]
})
export class AdministracionModule { }
