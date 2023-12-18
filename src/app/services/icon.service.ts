import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface IIcon {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private listIcons: IIcon[] = [
    { name: "logo", path: "../assets/img/logo.svg" },
    { name: "clients", path: "../assets/img/clients.svg" },
    { name: "lecturas", path: "../assets/img/lecturas.svg" },
    { name: "facturas", path: "../assets/img/facturas.svg" },
    { name: "sesiones", path: "../assets/img/sesiones.svg" },
    { name: "administracion", path: "../assets/img/administracion.svg" },
  ];
  
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.registryIcons();
  }

  //funcion 
  registryIcons() {
    this.listIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path))
    })
  }

}
