// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { ActivityTrackerServiceService } from './activity-tracker-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<any>(null);
  public usuario = this.usuarioSubject.asObservable();
  private inactivityTimer!: Subscription;

  constructor(private router: Router, private activityTracker: ActivityTrackerServiceService) {
    this.checkAuthentication();
    this.activityTracker.activity$.subscribe(() => {
      this.resetInactivityTimer();
    });
  }

  iniciarSesion(usuarioInfo: any): void {
    this.isAuthenticatedSubject.next(true);
    this.usuarioSubject.next(usuarioInfo);
    sessionStorage.setItem('usuario', JSON.stringify(usuarioInfo));
    this.iniciarTemporizadorInactividad();
  }

  cerrarSesion(): void {
    this.isAuthenticatedSubject.next(false);
    this.usuarioSubject.next(null);
    sessionStorage.removeItem('usuario');
    this.detenerTemporizadorInactividad();
    this.router.navigate(['/inicio']);
  }

  obtenerUsuario(): { nombre: string, cedula: string, cargo: string } | null {
    const usuarioString = sessionStorage.getItem('usuario');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }

  iniciarTemporizadorInactividad(): void {
    this.detenerTemporizadorInactividad();
    const tiempoInactividadMinutos = 30;
    const tiempoInactividadMilisegundos = tiempoInactividadMinutos * 60 * 1000;
    this.inactivityTimer = timer(tiempoInactividadMilisegundos).subscribe(() => {
      this.cerrarSesion();
    });
  }

  resetInactivityTimer(): void {
    this.detenerTemporizadorInactividad();
    this.iniciarTemporizadorInactividad();
  }

  detenerTemporizadorInactividad(): void {
    if (this.inactivityTimer) {
      this.inactivityTimer.unsubscribe();
    }
  }

  checkAuthentication(): void {
    const usuario = this.obtenerUsuario();
    if (usuario) {
      this.iniciarSesion(usuario);
    }
  }
}
