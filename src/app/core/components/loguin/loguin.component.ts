import { Component, OnInit } from '@angular/core';
import { ServeLoginService } from '../../serve/serve-login.service';
import { AuthService } from '../../serve/auth.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'gst-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent implements OnInit {
  showSpinner: boolean = false;
  tooglePassword=true;
  username: string = '';
  password: string = '';
  checkboxType: string | null = null;

  constructor(private _servAdminstracion: ServeLoginService, private authService: AuthService, private router: Router, private menuService: MenuService) { }
  ngOnInit(): void {
    if (this.authService.obtenerUsuario()?.cargo == 'LECTOR') {
      this.router.navigate(['/servicios/lecturas']);
    } if (this.authService.obtenerUsuario()?.cargo == 'ADMIN') {
      this.router.navigate(['/servicios/clientes']);
    } if (this.authService.obtenerUsuario()?.cargo == 'TESORERO') {
      this.router.navigate(['/servicios/facturas']);
    } if (this.authService.obtenerUsuario()?.cargo == 'CLIENTE') {
      this.router.navigate(['/servicios/facturas']);
    } if (this.authService.obtenerUsuario()?.cargo == 'SECRETARIO') {
      this.router.navigate(['/servicios/facturas']);
    }
  }
  
  onCheckboxChange(type: string) {
    if (this.checkboxType === type) {
      this.checkboxType = null;
    } else {
      this.checkboxType = type;
    }
  }

  async login() {
    try {
      this.showSpinner = true; 
      if (this.checkboxType === 'Administracion') {
        const response = await this._servAdminstracion.obtenerAdministracion(this.username, this.password);
        this.procesarRespuesta(response);
      } else if (this.checkboxType === 'Cliente') {
        const response = await this._servAdminstracion.obtenerCliente(this.username, this.password);
        this.procesarRespuesta(response);
      } else {
        alert('Seleccione un tipo de usuario');
      this.showSpinner = false; 

      }
    } catch (error) {
      alert('Error al autenticar');
      this.showSpinner = false; 

    }
  }

  procesarRespuesta(response: any[]) {
    if (this.checkboxType == 'Cliente') {
      if (response.length > 0) {
        const usuario = response[0];
        const nombre = usuario.NOM_USU + ' ' + usuario.APE_USU;
        const cedula = usuario.CED_USU;
        const cargo = 'CLIENTE';
        this.authService.iniciarSesion({ nombre, cedula, cargo });
        this.router.navigate(['servicios/facturas/verFacturas']);
      } else {
        alert('No se encontraron datos');
        this.showSpinner =false;
      }
    } else if (this.checkboxType == 'Administracion') {
      if (response.length > 0) {
        const usuario = response[0];
        const nombre = usuario.NOM_USU + ' ' + usuario.APE_USU;
        const cedula = usuario.CED_USU_DIR;
        const cargo = usuario.CARGO;
        this.authService.iniciarSesion({ nombre, cedula, cargo });
        if (cargo === 'ADMIN') {
          this.router.navigate(['servicios/clientes']);
        } else if (cargo === 'LECTOR') {
          this.router.navigate(['/servicios/lecturas']);
        } else if (cargo === 'TESORERO') {
          this.router.navigate(['servicios/facturas']);
        } else if (cargo === 'SECRETARIO') {
          this.router.navigate(['servicios/sesiones']);
        }
      } else {
        alert('No se encontraron datos');
        this.showSpinner =false;
      }
    }
  }

  formValid(): boolean {
    return !!(this.username && this.password);
  }
  formValidate(): boolean {
    return !!this.username && !!this.password && !!this.checkboxType; 
  }
  
}
