import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
  standalone: false,
})
export class RegisterModalComponent {
  registerForm: FormGroup;
  passwordVisible: boolean = false;
  repeatPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mustMatch: true };
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'repeatPassword') {
      this.repeatPasswordVisible = !this.repeatPasswordVisible;
    }
  }

  async closeModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  async openLoginModal(): Promise<void> {
    await this.modalController.dismiss();

    // Crear y presentar el modal de login
    const modal = await this.modalController.create({
      component: LoginModalComponent,
    });
    await modal.present();
  }

  register(): void {
    if (this.registerForm.valid) {
      const { fullName, email, password } = this.registerForm.value;

      // Paso 1: Crear el usuario en Strapi
      this.authService.register({ username: fullName, email, password }).subscribe({
        next: (userResponse) => {
          console.log('Usuario creado:', userResponse);

          // Paso 2: Crear la persona asociada en la colección Personas
          const personaData = {
            rol: 'Gestor', // Asignar el rol "Gestor"
            user: userResponse.user.id, // Relacionar con el ID del usuario creado
          };
          this.authService.createPersona(personaData).subscribe({
            next: (personaResponse) => {
              console.log('Persona creada:', personaResponse);
              this.closeModal();
            },
            error: (err) => {
              console.error('Error creando persona:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error registrando usuario:', err);
        },
      });
    }
  }
}
