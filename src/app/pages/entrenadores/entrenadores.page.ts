import { Component, OnInit } from '@angular/core';
import { JugadorEntrenadorService } from 'src/app/services/Jugador_Entrenador/jugador-entrenador.service';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.page.html',
  styleUrls: ['./entrenadores.page.scss'],
  standalone:false
})
export class EntrenadoresPage implements OnInit {
  entrenadores: any[] = []; // Lista de entrenadores a mostrar

  constructor(private jugadorEntrenadorService: JugadorEntrenadorService) {}

  ngOnInit() {
    this.cargarEntrenadores();
  }

  /**
   * Cargar entrenadores desde el servicio
   */
  cargarEntrenadores() {
    this.jugadorEntrenadorService.getEntrenadores().subscribe({
      next: (response) => {
        // Mapear los datos para obtener la estructura necesaria
        this.entrenadores = response.data.map((entrenador: any) => ({
          id: entrenador.id,
          ...entrenador.attributes,
          perfil: entrenador.attributes.perfil?.data?.attributes,
          user: entrenador.attributes.user?.data?.attributes,
        }));
      },
      error: (error) => {
        console.error('Error al cargar entrenadores:', error);
      },
    });
  }
}
