import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gst-abrir-dialogo',
  templateUrl: './abrir-dialogo.component.html',
  styleUrls: ['./abrir-dialogo.component.css']
})
export class AbrirDialogoComponent {
  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AbrirDialogoComponent) {
    this.title = data.title;
    this.message = data.message;
  }
}
