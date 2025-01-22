import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SesionesService {
  private apiUrl = 'http://localhost:1337/api'; // Base URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todas las sesiones con imagen incluida
  getSesiones(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.apiUrl}/sesiones?populate=sesionpicture`, { headers })
      .pipe(map((response) => response.data)); // Retornar solo los datos
  }

  getEntrenadores(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(
      'http://localhost:1337/api/personas?filters[Rol][$eq]=Entrenador&populate=user',
      { headers }
    );
  }
  
  getJugadores(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(
      'http://localhost:1337/api/personas?filters[Rol][$eq]=Jugador&populate=user',
      { headers }
    );
  }  
  
  // Obtener entrenamientos
  getEntrenamientos(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/entrenamientos`)
      .pipe(map((response) => response.data)); // Retornar solo los datos
  }

  crearSesion(sesionData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = { data: sesionData }; // Strapi espera que los datos estén en el objeto `data`
    return this.http.post(`http://localhost:1337/api/sesiones`, payload, { headers });
  }
  
  
}
