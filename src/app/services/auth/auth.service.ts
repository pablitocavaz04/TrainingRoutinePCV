import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://people-service-alqk.onrender.com'; 

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, userData);
  }

  createPersona(personaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/personas`, personaData);
  }
}
