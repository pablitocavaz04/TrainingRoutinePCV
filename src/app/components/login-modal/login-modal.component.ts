import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  standalone: false,
})
export class LoginModalComponent {
  loginForm: FormGroup;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async openRegisterModal(): Promise<void> {
    await this.modalCtrl.dismiss();

    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
    });
    await modal.present();
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ identifier: email, password }).subscribe({
        next: async (response) => {
          console.log('Login exitoso:', response);

          // Guardar el token en localStorage
          localStorage.setItem('authToken', response.jwt);

          // Cerrar el modal
          await this.closeModal();

          // Mostrar la splash page
          const splashPage = document.querySelector('.splash-page');
          if (splashPage) splashPage.classList.add('visible');

          setTimeout(() => {
            if (splashPage) splashPage.classList.remove('visible');
            // Redirigir al home
            window.location.href = '/home';
          }, 3000); // Esperar 3 segundos
        },
        error: (err) => {
          console.error('Error en el login:', err);
          // Mostrar un mensaje de error si es necesario
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}