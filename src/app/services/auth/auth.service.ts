import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:1337/api'; // URL base del backend

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

  // Login del usuario
  login(credentials: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, credentials);
  }

  // Obtener el token del usuario logueado desde localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Obtener los datos del usuario logueado (incluyendo relación con persona y perfil)
  getUsuarioLogueado(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/users/me?populate=persona.perfil`, { headers });
    } else {
      throw new Error('No se encontró el token en localStorage.');
    }
  }

  isUserActive(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return new Observable((observer) => observer.next(false));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users/me?populate=persona`, { headers }).pipe(
      map((user: any) => {
        console.log('Respuesta del backend:', user);
        // Verificar si el usuario no está bloqueado y tiene un rol válido
        return user?.blocked === false && user?.persona?.Rol ? true : false;
      })
    );
  }
  
  
}
