import { Component, OnInit } from '@angular/core';
import { ServeLoginService } from '../../serve/serve-login.service';
import { AuthService } from '../../serve/auth.service';
import { Router } from '@angular/router';
import { ServeTarifaAguaService } from 'src/app/configuracion/serve/serve-tarifa-agua.service';
import { MensajeokComponent } from '../mensajeok/mensajeok.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'gst-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent implements OnInit {
  showSpinner: boolean = false;
  tooglePassword = true;
  username: string = '';
  password: string = '';
  fieldsCompleted: boolean = false;
  
  constructor(private _servAdminstracion: ServeLoginService, private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.authService.obtenerUsuario()?.cargo == 'LECTOR') {
      this.router.navigate(['/servicios/lecturas']);
    } if (this.authService.obtenerUsuario()?.cargo == 'ADMINISTRADOR') {
      this.router.navigate(['/servicios/clientes']);
    } if (this.authService.obtenerUsuario()?.cargo == 'TESORERO') {
      this.router.navigate(['/servicios/facturas']);
    } if (this.authService.obtenerUsuario()?.cargo == 'CLIENTE') {
      this.router.navigate(['/servicios/facturas/verFacturas']);
    } if (this.authService.obtenerUsuario()?.cargo == 'SECRETARIO') {
      this.router.navigate(['/servicios/facturas']);
    }
  }


  async login() {
    try {
      this.showSpinner = true;
      const responseCliente = await this._servAdminstracion.obtenerCliente(this.username, this.password);
      if (responseCliente && Object.keys(responseCliente).length > 0) {
        this.procesarRespuestaCliente(responseCliente, 'CLIENTE');
        console.log(responseCliente);
      } else {
        const responseAdmin= await this._servAdminstracion.obtenerAdministracion(this.username, this.password);
        if (responseAdmin && Object.keys(responseAdmin).length > 0) {
          this.procesarRespuestaAdmin(responseAdmin, 'ADMINISTRADOR');
        } else {
          // Si no se encontraron datos ni como administrador ni como cliente
          alert('No se encontraron datos');
          this.showSpinner = false;
        }
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      this.mensajeError("Error al autenticar, verifique los datos.");
      this.showSpinner = false;
    }
  }
  
  procesarRespuestaCliente(response: any[], tipo: string){
    if(response.length>0){
      const usuario = response[0];
      if (tipo === 'CLIENTE') {
        const nombre = usuario.NOM_USU + ' ' + usuario.APE_USU;
        const cedula = usuario.CED_USU;
        const cargo = 'CLIENTE';
        this.authService.iniciarSesion({ nombre, cedula, cargo });
        this.router.navigate(['servicios/facturas/verFacturas']);

      }
    }
  }
  
  
  procesarRespuestaAdmin(response: any, tipo: string) {
    if (response) {
      if (tipo === 'ADMINISTRADOR') {
        const nombre = response.NOM_USU + ' ' + response.APE_USU;
        const cedula = response.CED_USU_DIR;
        const cargo = response.CARGO;
        this.authService.iniciarSesion({ nombre, cedula, cargo });
        switch (cargo) {
          case 'ADMINISTRADOR':
            this.router.navigate(['servicios/clientes']);
            break;
          case 'LECTOR':
            this.router.navigate(['/servicios/lecturas']);
            break;
          case 'TESORERO':
            this.router.navigate(['servicios/facturas']);
            break;
          case 'SECRETARIO':
            this.router.navigate(['servicios/sesiones']);
            break;
          default:
            alert('Cargo no reconocido');
            this.showSpinner = false;
            break;
        }
      }
    } else {
      alert('No se encontraron datos');
      this.showSpinner = false;
    }
  }

  areFieldsFilled(): boolean {
    return this.username.trim().length > 0 && this.password.trim().length > 0;
  }
 
  mensajeError(mensaje: string) {
    const dialogRef = this.dialog.open(MensajeokComponent, {
      data: {
        title: 'Aviso',
        message: mensaje
      }
    });
  }

}
