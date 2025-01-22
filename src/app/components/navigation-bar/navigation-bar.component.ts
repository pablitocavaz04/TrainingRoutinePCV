import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: false,
})
export class NavigationBarComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;
  imagenPerfil: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarImagenPerfil();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  cargarImagenPerfil() {
    this.authService.getUsuarioLogueado().subscribe({
      next: (usuario) => {
        this.imagenPerfil = usuario?.persona?.perfil?.formats?.thumbnail?.url || usuario?.persona?.perfil?.url || null;
      },
      error: (err) => {
        console.error('Error al obtener la imagen del usuario:', err);
      },
    });
  }
}
