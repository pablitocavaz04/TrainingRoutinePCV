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

  crearEntrenamiento(entrenamiento: { nombre: string; descripcion: string; fecha: string; entreno?: number }): Observable<any> {
    const url = 'http://localhost:1337/api/entrenamientos';
    const body = {
      data: {
        nombre: entrenamiento.nombre,
        descripcion: entrenamiento.descripcion,
        fecha: entrenamiento.fecha,
        entreno: entrenamiento.entreno, // Asociar la imagen
      },
    };
    return this.http.post(url, body);
  }

  actualizarEntrenamiento(id: number, entrenamiento: any): Observable<any> {
    const url = `http://localhost:1337/api/entrenamientos/${id}`;
    const body = { data: entrenamiento };
    return this.http.put(url, body);
  }

  subirImagen(file: File): Observable<any> {
    const url = 'http://localhost:1337/api/upload';
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post(url, formData);
  }

  eliminarEntrenamiento(id: number): Observable<any> {
    const url = `http://localhost:1337/api/entrenamientos/${id}`;
    return this.http.delete(url);
  }
  
}