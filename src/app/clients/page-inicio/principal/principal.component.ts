import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'gst-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  activeTabIndex: number = 0;

  constructor(private router: Router) {
    const storedTabIndex = localStorage.getItem('activeSocios');
    if (storedTabIndex !== null) {
      this.activeTabIndex = +storedTabIndex; // Convertir a número
    }
   }

  onTabChange(event: MatTabChangeEvent): void {
    this.activeTabIndex = event.index;
    
    localStorage.setItem('activeSocios', this.activeTabIndex.toString());
    const selectedIndex = event.index;
    switch (selectedIndex) {
      case 0:
        this.router.navigateByUrl('/servicios/clientes/usuarios');
        break;
      case 1:
        this.router.navigateByUrl('/servicios/clientes/medidores');
        break;
      case 2:
        this.router.navigateByUrl('/servicios/clientes/usuariosPasivos');
        break;
      default:
        break;
    }
  }

}
