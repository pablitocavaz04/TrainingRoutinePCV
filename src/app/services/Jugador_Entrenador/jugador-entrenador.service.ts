import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JugadorEntrenadorService {
  private readonly API_URL = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los jugadores desde Strapi
   */
  getJugadores(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/personas?filters[Rol][$eq]=Jugador&populate=user,perfil`
    );
  }

  /**
   * Obtener todos los entrenadores desde Strapi
   */
  getEntrenadores(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/personas?filters[Rol][$eq]=Entrenador&populate=user,perfil`
    );
  }
}
