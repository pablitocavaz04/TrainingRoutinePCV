import { Component, OnInit } from '@angular/core';
import { SesionesService } from 'src/app/services/sesiones/sesiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  sesiones: any[] = []; // Array para almacenar las sesiones

  constructor(private sesionesService: SesionesService) {}

  ngOnInit() {
    this.cargarSesiones();
  }

  cargarSesiones() {
    this.sesionesService.getSesiones().subscribe({
      next: (response) => {
        this.sesiones = response.data.map((sesion: any) => ({
          id: sesion.id,
          nombre: sesion.attributes.nombre,
          estado: sesion.attributes.estado,
          imagen:
            sesion.attributes.sesionpicture?.data?.attributes?.formats?.thumbnail?.url ||
            sesion.attributes.sesionpicture?.data?.attributes?.url ||
            null,
        }));
      },
      error: (err) => {
        console.error('Error al cargar sesiones:', err);
      },
    });
  }
}
