import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMenu, MenuService } from 'src/app/services/menu.service';
import { AuthService } from '../../serve/auth.service';

@Component({
  selector: 'gst-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  listMenu: IMenu[] = [];
  expanded = true;
  @Output() onToggleExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private menuService: MenuService, private authService: AuthService) {
    this.listMenu = menuService.getMenu()
  }

  activeButton: string | null = null;

  ngOnInit() {
    const storedActiveButton = localStorage.getItem('activeButton');
    this.activeButton = storedActiveButton || null; // Asignar null si no hay valor en el localStorage
  }

  

  onButtonClick(route: string): void {
    this.activeButton = route;
    localStorage.setItem('activeButton', this.activeButton);
    localStorage.removeItem('activeSocios');
    localStorage.removeItem('activeLecturas');
    localStorage.removeItem('activeFacturas');
    localStorage.removeItem('activeSesiones');
    localStorage.removeItem('activeAdministracion');
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.onToggleExpanded.emit(this.expanded);
  }

  isSessionActive(): boolean {
    return !!this.authService.obtenerUsuario(); // Devuelve true si hay un usuario, false si es null
  }

  

}
