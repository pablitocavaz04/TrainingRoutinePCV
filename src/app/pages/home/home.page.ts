import { Component, OnInit } from '@angular/core';
import { SesionesService } from 'src/app/services/sesiones/sesiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  sesiones: any[] = [];

  constructor(private sesionesService: SesionesService) {}

  ngOnInit() {
    this.cargarSesiones();
  }

  cargarSesiones() {
    this.sesionesService.getSesiones().subscribe((response) => {
      this.sesiones = response.data.map((item: any) => ({
        id: item.id,
        nombre: item.attributes.nombre,
        estado: item.attributes.estado,
        imagen:
          item.attributes.sesionpicture?.data?.attributes?.formats?.thumbnail
            ?.url || item.attributes.sesionpicture?.data?.attributes?.url,
      }));
    });
  }

  abrirModalCrearSesion() {
    console.log('Abrir modal para crear sesión');
  }

  editarSesion(sesion: any) {
    console.log('Editar sesión:', sesion);
  }

  eliminarSesion(sesion: any) {
    console.log('Eliminar sesión:', sesion);
  }
}
