import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';
import { TranslationService } from 'src/app/services/translate/translate.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: false,
})
export class LandingPage {
isLanguageMenuOpen: boolean = false;
currentLanguage: string = 'es'; // Valor inicial según el idioma por defecto

  constructor(private router: Router, 
              private modalCtrl: ModalController,
              private translationService: TranslationService) {}

  toggleLanguageMenu() {
  this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
}
  
changeLanguage(lang: string) {
  this.currentLanguage = lang;
  this.translationService.setLanguage(lang); // Cambiar idioma en el servicio de traducción
  this.isLanguageMenuOpen = false; // Cerrar el menú
}

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      cssClass: 'animated-modal', // Clase personalizada para animación
    });
    return await modal.present();
  }
  

  navigateToNextPage() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/home']); // Redirige al Home si hay token
    } else {
      this.openLoginModal(); // Abre el modal si no hay token
    }
  }
}
