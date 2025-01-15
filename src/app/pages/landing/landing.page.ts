import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: false,
})
export class LandingPage {
  constructor(private router: Router, private modalCtrl: ModalController) {}

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
