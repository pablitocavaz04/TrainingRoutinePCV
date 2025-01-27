import { Component, OnInit } from '@angular/core';
import { JugadorEntrenadorService } from 'src/app/services/Jugador_Entrenador/jugador-entrenador.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
  standalone:false
})
export class JugadoresPage implements OnInit {
  jugadores: any[] = []; // Lista de jugadores que se mostrará en la página

  constructor(private jugadorEntrenadorService: JugadorEntrenadorService) {}

  ngOnInit() {
    this.cargarJugadores();
  }

  /**
   * Cargar jugadores desde el servicio
   */
  cargarJugadores() {
    this.jugadorEntrenadorService.getJugadores().subscribe({
      next: (response) => {
        // Mapear los datos para obtener la estructura necesaria
        this.jugadores = response.data.map((jugador: any) => ({
          id: jugador.id,
          ...jugador.attributes,
          perfil: jugador.attributes.perfil?.data?.attributes,
          user: jugador.attributes.user?.data?.attributes,
        }));
      },
      error: (error) => {
        console.error('Error al cargar jugadores:', error);
      },
    });
  }
}
