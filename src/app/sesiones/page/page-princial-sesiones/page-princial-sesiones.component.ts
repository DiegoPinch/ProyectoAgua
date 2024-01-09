import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';


@Component({
  selector: 'gst-page-princial-sesiones',
  templateUrl: './page-princial-sesiones.component.html',
  styleUrls: ['./page-princial-sesiones.component.css']
})
export class PagePrincialSesionesComponent {
  activeTabIndex: number = 0;


  constructor(private router: Router) {
    const storedTabIndex = localStorage.getItem('activeSesiones');
    if (storedTabIndex !== null) {
      this.activeTabIndex = +storedTabIndex; // Convertir a número
    }
  }

  onTabChange(event: number): void {
    this.activeTabIndex = event;

    localStorage.setItem('activeSesiones', this.activeTabIndex.toString());

    switch (event) {
      case 0:
        this.router.navigateByUrl('/servicios/sesiones/sesiones');
        break;
      case 1:
        this.router.navigateByUrl('/servicios/sesiones/actas');
        break;
      case 2:
        this.router.navigateByUrl('/servicios/sesiones/mingas');
        break;
      default:
        break;
    }
  }

 
}
