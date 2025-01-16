import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');

    if (token) {
      // Si hay un token, permitir el acceso
      return true;
    } else {
      // Si no hay token, redirigir a la landing page
      this.router.navigate(['/landing']);
      return false;
    }
  }
}
