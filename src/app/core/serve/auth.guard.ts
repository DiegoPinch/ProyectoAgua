// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const usuario = this.authService.obtenerUsuario();
    if (usuario) {
      const rolesPermitidos = (route.data as any)['roles'] as string[];
      if (rolesPermitidos && rolesPermitidos.includes(usuario.cargo)) {
        return true;
      } else {
        alert("Acceso Denegado!");
        //this.router.navigate(['/inicio']);
        return false;
      }
    }
    alert('Primero debe iniciar sesión');
    this.router.navigate(['/servicios']); // Redirige al inicio si no está autenticado
    return false;
  }
}
