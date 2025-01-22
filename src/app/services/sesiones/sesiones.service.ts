import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SesionesService {
  private apiUrl = 'http://localhost:1337/api/sesiones?populate=sesionpicture'; 

  constructor(private http: HttpClient) {}

  getSesiones(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No se encontró el token en localStorage.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
