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

  getSesiones(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.apiUrl}/sesiones?populate=sesionpicture`, { headers })
      .pipe(map((response) => response.data));
  }

  getEntrenadores(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(
      `${this.apiUrl}/personas?filters[Rol][$eq]=Entrenador&populate=user`,
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
      `${this.apiUrl}/personas?filters[Rol][$eq]=Jugador&populate=user`,
      { headers }
    );
  }

  getEntrenamientos(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.apiUrl}/entrenamientos`, { headers })
      .pipe(map((response) => response.data));
  }

  crearSesion(sesionData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/sesiones`, sesionData, { headers });
  }

  actualizarSesion(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/sesiones/${id}`, { data }, { headers });
  }

  getSesion(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(
        `${this.apiUrl}/sesiones/${id}?populate=entrenador.user,entrenamiento,jugadores.user,sesionpicture`,
        { headers }
      )
      .pipe(map((response) => response.data));
  }

  subirImagen(file: File): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('files', file);
  
    return this.http.post(`${this.apiUrl}/upload`, formData, { headers });
  }
  
  
}
