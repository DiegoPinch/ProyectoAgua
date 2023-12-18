import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturasRoutingModule } from './lecturas-routing.module';
import { PageLecturasComponent } from './page/page-lecturas-principal/page-lecturas.component';
import { SharedtableModule } from '../sharedtable/sharedtable.module';
import { SharedModule } from '../shared/shared.module';
import { IngresarEditarComponent } from './page/ingresar/ingresar-editar.component';
import { PageeditarlecturasComponent } from './page/pageeditarlecturas/pageeditarlecturas.component';
import { EditarComponent } from './page/editar/editar.component';
import { PageIngresolecturasComponent } from './page/page-ingresolecturas/page-ingresolecturas.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    PageLecturasComponent,
    IngresarEditarComponent,
    PageeditarlecturasComponent,
    EditarComponent,
    PageIngresolecturasComponent,
    
    
  ],
  imports: [
    CommonModule,
    LecturasRoutingModule,
    SharedModule,
    SharedtableModule
  ],
  exports: [
    PageLecturasComponent,
    IngresarEditarComponent,
    PageeditarlecturasComponent,
    EditarComponent,
    PageIngresolecturasComponent,
    
  ]
})
export class LecturasModule { }
