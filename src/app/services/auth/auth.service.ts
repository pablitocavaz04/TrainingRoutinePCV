import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:1337/api'; // URL base del backend

  constructor(private http: HttpClient) {}
//Registrar el usuario en user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, userData);
  }

//A la vez que creamos el user , con una relacion 1 a 1 , creamos la persona con el Rol Gestor.
  createPersona(personaData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/personas`, personaData, { headers });
  }

  login(credentials: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, credentials);
  }
  
}
