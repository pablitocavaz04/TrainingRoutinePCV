import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { Router } from '@angular/router';

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
  isLanguageMenuOpen = false;
  isProfileMenuOpen = false;
  currentLanguage = 'es';
  usuarioCorreo: string | null = null;

  constructor(
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarImagenPerfil();
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLanguageMenu(event: Event) {
    event.stopPropagation();
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translationService.setLanguage(lang);
    this.isLanguageMenuOpen = false;
  }

  cargarImagenPerfil() {
    this.authService.getUsuarioLogueado().subscribe({
      next: (usuario) => {
        this.imagenPerfil =
          usuario?.persona?.perfil?.formats?.thumbnail?.url || usuario?.persona?.perfil?.url || null;
        this.usuarioCorreo = usuario?.email || null;
      },
      error: (err) => {
        console.error('Error al obtener la imagen del usuario:', err);
      },
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }

  // Detectar clics fuera del menú y cerrarlo automáticamente
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Si el clic no es dentro del menú de perfil, se cierra
    if (!target.closest('.profile-wrapper')) {
      this.isProfileMenuOpen = false;
    }
  }
}
