import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
            thumbnail?: {
              url: string;
            };
          };
          url: string;
        };
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class EntrenamientosService {
  private apiUrl = 'http://localhost:1337/api/entrenamientos?populate=entreno';

  constructor(private http: HttpClient) {}

  getEntrenamientos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  crearEntrenamiento(entrenamiento: { nombre: string; descripcion: string; fecha: string }): Observable<any> {
    const url = 'http://localhost:1337/api/entrenamientos';
    const body = {
      data: {
        nombre: entrenamiento.nombre,
        descripcion: entrenamiento.descripcion,
        fecha: entrenamiento.fecha,
      },
    };
    return this.http.post(url, body);
  }
}
