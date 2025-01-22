import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  // Registrar el usuario en la tabla user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, userData);
  }

  // Crear persona relacionada con el usuario
  createPersona(personaData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/personas`, personaData, { headers });
  }

  login(credentials: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUsuarioLogueado(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/users/me?populate=persona.perfil`, { headers });
    } else {
      throw new Error('No se encontró el token en localStorage.');
    }
  }
}
