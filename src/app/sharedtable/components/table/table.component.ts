import { Component, EventEmitter, Input ,Output,SimpleChanges} from '@angular/core';
import { MetaDataColumn } from '../../interfaces/metacolumn.interfaces';

@Component({
  selector: 'gst-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() data: any;
  @Input() metaDataColumns!: MetaDataColumn[];
  
  @Output() actionClicked = new EventEmitter<any>();

  listFields: string[] =[];
  ngOnChanges(changes: SimpleChanges){
    if(changes['metaDataColumns']){
      this.listFields= this.metaDataColumns.map((x)=>x.field)
    }
  }
 
  // Método para manejar las acciones personalizadas
  ejecutarAccion(accion: any, rowData: any) {
    this.actionClicked.emit({ accion, rowData });
  }
}
