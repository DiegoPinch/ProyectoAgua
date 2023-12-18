import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TitleComponent } from './components/title/title.component';
import { ContainerComponent } from './components/container/container.component';
import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { SpinerComponent } from './components/spiner/spiner.component';
@NgModule({
  declarations: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    PaginatorComponent,
    KeypadButtonComponent,
    SpinerComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    PaginatorComponent,
    KeypadButtonComponent,
    SpinerComponent
    
  ]
})
export class SharedtableModule { }
