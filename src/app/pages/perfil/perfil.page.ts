import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone:false
})
export class PerfilPage implements OnInit {
  usuario: any = null; // Almacenará los datos del usuario
  imagenPerfil: string | null = null; // Almacenará la URL de la imagen de perfil

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    this.authService.getUsuarioLogueado().subscribe({
      next: (response) => {
        console.log('Datos del usuario logueado:', response);
        this.usuario = response;
        this.imagenPerfil =
          response.persona?.perfil?.formats?.thumbnail?.url || null; // Obtener la URL de la imagen de perfil
      },
      error: (err) => {
        console.error('Error al obtener los datos del usuario:', err);
      },
    });
  }
}
