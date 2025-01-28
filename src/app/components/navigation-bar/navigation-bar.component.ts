import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslationService } from 'src/app/services/translate/translate.service';

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
  isLanguageMenuOpen = false; // Controla la apertura del menú de idioma
  currentLanguage = 'es'; // Idioma actual

  constructor(private authService: AuthService, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.cargarImagenPerfil();
    this.currentLanguage = this.translationService.getCurrentLanguage(); // Obtener el idioma guardado
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen; // Abrir/cerrar menú de idiomas
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang; // Actualizar idioma actual
    this.translationService.setLanguage(lang); // Cambiar idioma en el servicio
    this.isLanguageMenuOpen = false; // Cerrar menú de idiomas
  }

  cargarImagenPerfil() {
    this.authService.getUsuarioLogueado().subscribe({
      next: (usuario) => {
        this.imagenPerfil =
          usuario?.persona?.perfil?.formats?.thumbnail?.url || usuario?.persona?.perfil?.url || null;
      },
      error: (err) => {
        console.error('Error al obtener la imagen del usuario:', err);
      },
    });
  }
}
