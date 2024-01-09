import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'gst-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  activeTabIndex: number = 0;

  constructor(private router: Router) {
    const storedTabIndex = localStorage.getItem('activeConfiguracion');
    if (storedTabIndex !== null) {
      this.activeTabIndex = +storedTabIndex; // Convertir a número
    }
   }

  onTabChange(event: MatTabChangeEvent): void {
    this.activeTabIndex = event.index;
    
    localStorage.setItem('activeConfiguracion', this.activeTabIndex.toString());
  
    const selectedIndex = event.index;

    switch (selectedIndex) {
      case 0:
        this.router.navigateByUrl('/servicios/configuracion/tarifaAgua');
        break;
      case 1:
        this.router.navigateByUrl('/servicios/configuracion/tarifaMulta');
        break;
      default:
        break;
    }
  }
}
