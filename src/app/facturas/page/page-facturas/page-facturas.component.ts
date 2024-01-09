import { Component} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'gst-page-facturas',
  templateUrl: './page-facturas.component.html',
  styleUrls: ['./page-facturas.component.css']
})
export class PageFacturasComponent {
  activeTabIndex: number = 0;

  constructor(private router: Router) {
    const storedTabIndex = localStorage.getItem('activeLecturas');
    if (storedTabIndex !== null) {
      this.activeTabIndex = +storedTabIndex; // Convertir a número
    }
   }

  onTabChange(event: MatTabChangeEvent): void {
    this.activeTabIndex = event.index;
    
    localStorage.setItem('activeFacturas', this.activeTabIndex.toString());
  
    const selectedIndex = event.index;

    switch (selectedIndex) {
      case 0:
        this.router.navigateByUrl('/servicios/facturas/cobrarFacturas');
        break;
      case 1:
        this.router.navigateByUrl('/servicios/facturas/verFacturas');
        break;
      default:
        break;
    }
  }
}
