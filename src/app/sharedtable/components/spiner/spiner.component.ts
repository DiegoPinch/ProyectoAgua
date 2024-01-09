import { Component, Input } from '@angular/core';

@Component({
  selector: 'gst-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.css']
})
export class SpinerComponent {
  @Input() showSpinner: boolean = false; // Input para controlar la visibilidad del spinner
  invertProgress: boolean = true;
}
