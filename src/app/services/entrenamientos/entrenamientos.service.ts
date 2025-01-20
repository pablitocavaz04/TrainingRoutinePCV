import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para la estructura de los entrenamientos
export interface Entrenamiento {
  id: number;
  attributes: {
    nombre: string;
    descripcion: string;
    fecha: string;
    entreno?: {
      data?: {
        attributes?: {
          formats?: {
            thumbnail?: { url: string };
          };
          url?: string;
        };
      };
    };
  };
}

// Interfaz para la respuesta completa de la API
export interface EntrenamientosResponse {
  data: Entrenamiento[];
}

@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService {
  private apiUrl = 'http://localhost:1337/api/entrenamientos?populate=entreno';

  constructor(private http: HttpClient) {}

  getEntrenamientos(): Observable<EntrenamientosResponse> {
    return this.http.get<EntrenamientosResponse>(this.apiUrl);
  }
}
