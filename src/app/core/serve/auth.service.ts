// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    private usuarioSubject = new BehaviorSubject<any>(null);
    public usuario = this.usuarioSubject.asObservable();
    private inactivityTimer!: Subscription;
    
    constructor() { }

    iniciarSesion(usuarioInfo: any): void {
        this.isAuthenticatedSubject.next(true);
        this.usuarioSubject.next(usuarioInfo);
        localStorage.setItem('usuario', JSON.stringify(usuarioInfo));
        this.iniciarTemporizadorInactividad();
    }

    cerrarSesion(): void {
        this.isAuthenticatedSubject.next(false);
        this.usuarioSubject.next(null);
        localStorage.removeItem('usuario');
        this.detenerTemporizadorInactividad();
    }

    obtenerUsuario(): { nombre: string, cedula: string, cargo: string } | null {
        const usuarioString = localStorage.getItem('usuario');
        return usuarioString ? JSON.parse(usuarioString) : null;
    }

    iniciarTemporizadorInactividad(): void {
        this.detenerTemporizadorInactividad();
        const tiempoInactividadMinutos = 30;
        const tiempoInactividadMilisegundos = tiempoInactividadMinutos * 60 * 1000;
        this.inactivityTimer = timer(tiempoInactividadMilisegundos).pipe(
            takeUntil(this.isAuthenticatedSubject)
        ).subscribe(() => {
            this.cerrarSesion();
        });
    }

    detenerTemporizadorInactividad(): void {
        if (this.inactivityTimer) {
            this.inactivityTimer.unsubscribe();
        }
    }
}
