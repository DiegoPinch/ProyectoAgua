import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'gst-page-lecturas',
  templateUrl: './page-lecturas.component.html',
  styleUrls: ['./page-lecturas.component.css']
})


export class PageLecturasComponent   {
  activeTabIndex: number = 0;
  constructor(private router: Router) {
    const storedTabIndex = localStorage.getItem('activeLecturas');
    if (storedTabIndex !== null) {
      this.activeTabIndex = +storedTabIndex; // Convertir a número
    }
   }
  onTabChange(event: MatTabChangeEvent): void {
    this.activeTabIndex = event.index;
    
    localStorage.setItem('activeLecturas', this.activeTabIndex.toString());
  
    const selectedIndex = event.index;

    switch (selectedIndex) {
      case 0:
        this.router.navigateByUrl('/servicios/lecturas/ingresar');
        break;
      case 1:
        this.router.navigateByUrl('/servicios/lecturas/editar');
        break;
      default:
        break;
    }
  }

}


