import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { BaseAuthenticationService } from '../services/impl/base-authentication.service';
import { filter, map, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(BaseAuthenticationService);
    const router = inject(Router);
  
    return authService.ready$.pipe(
        filter(isReady => isReady), // Esperar a que `ready$` sea true
        take(1), // Solo tomar el primer valor true
        switchMap(() => authService.authenticated$), // Obtener el valor actual de autenticación
        map(isLoggedIn => {
          if (isLoggedIn) {
            return true; // Usuario autenticado, permitir acceso
          } else {
            // Usuario no autenticado, redirigir al login
            router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
        })
    );
  };