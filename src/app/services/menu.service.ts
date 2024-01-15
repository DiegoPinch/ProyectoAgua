import { Injectable } from '@angular/core';


export interface IMenu {
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private listMenu: IMenu[] =
  [
    {
      title: 'SOCIOS', url: '/servicios/clientes', icon: 'clients'
    },
    {
      title: 'Lecturas', url: '/servicios/lecturas', icon: 'lecturas'
    },
    {
      title: 'Facturas', url: '/servicios/facturas', icon: 'facturas'
    },
    {
      title: 'Actividades', url: '/servicios/sesiones', icon: 'sesiones'
    },
    {
      title: 'Administración', url: '/servicios/administracion', icon: 'administracion'
    },
    {
      title: 'Dashboard', url: '/servicios/dashboard', icon: 'dashboard'
    },
    
  ];
  constructor() { }

  getMenu(): IMenu[] {
    return [...this.listMenu]
  }

  getMenuByUrl(url: string): IMenu {
    console.log('URL a buscar:', url);
    
    const menu = this.listMenu.find((menu) => menu.url.toLowerCase() === url.toLowerCase());
    
    if (menu) {
      console.log('Menú encontrado:', menu);
    } else {
      console.log('Menú no encontrado');
    }
    
    return menu as IMenu;
  }
}
