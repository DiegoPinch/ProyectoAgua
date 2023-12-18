import { Component, HostListener, OnInit } from '@angular/core';
import { FechahoraService } from 'src/app/services/time/fechahora.service';
import { AuthService } from '../../serve/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gst-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentDateTime: string = '';
  usuarioNombre: string = '';
  nombreUsuario: string = '';
  showSpinner: boolean = false;

  constructor(private fechahoraService: FechahoraService,
    public authService: AuthService,
    private router: Router) {
      this.authService.usuario.subscribe(usuario => {
        console.log('usuario emitido:', usuario);
        if (usuario) {
          console.log('Datos de usuario presentes');
          this.authService.iniciarTemporizadorInactividad();
          this.nombreUsuario = `${usuario.nombre} `;
          console.log('Nombre de usuario:', this.nombreUsuario);
        } else {
          console.log('Datos de usuario ausentes o vacíos');
        }
      });
  }
 
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  reiniciarTemporizadorInactividad(): void {
    this.authService.iniciarTemporizadorInactividad();
  }

  ngOnInit() {
    this.showSpinner = true;
    this.fechahoraService.obtenerFechaHoraActual().subscribe((data: any) => {
      if (data && data.utc_datetime) {
        const currentDate = new Date(data.utc_datetime);
        this.currentDateTime = this.formatDate(currentDate);
        this.showSpinner = false;
      } else {
        this.currentDateTime = 'Fecha y hora no disponibles';
        this.showSpinner = true;
      }
    });
  }

  formatDate(date: Date): string {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const day = date.getDate();
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `Hoy es ${dayOfWeek} ${day} de ${monthNames[month]} del ${year}`;
  }

  logout(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/servicios']);
  }
}
