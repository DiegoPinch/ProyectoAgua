import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'gst-mensajeok',
  templateUrl: './mensajeok.component.html',
  styleUrls: ['./mensajeok.component.css']
})
export class MensajeokComponent {
  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MensajeokComponent) {
    this.title = data.title;
    this.message = data.message;
  }
}
