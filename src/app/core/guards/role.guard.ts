import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class roleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['role']; // Recuperar el rol esperado de las rutas
    const userRole = this.authService.getUserRole();

    if (this.authService.isAuthenticated() && userRole === expectedRole) {
      return true;
    }

    // Si no tiene el rol adecuado, redirige al login
    this.router.navigate(['/login']);
    return false;
  }
}
