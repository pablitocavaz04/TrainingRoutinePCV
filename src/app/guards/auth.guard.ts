import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isUserActive().pipe(
      tap((isActive) => {
        if (!isActive) {
          // Redirigir al usuario si no está activo
          this.router.navigate(['/landing']);
        }
      }),
      catchError((error) => {
        console.error('Error al verificar el estado del usuario:', error);
        this.router.navigate(['/landing']); // Redirige en caso de error
        return [false];
      })
    );
  }
}
