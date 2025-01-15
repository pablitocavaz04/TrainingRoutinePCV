import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from '../login-modal/login-modal.component';

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

  constructor(private fb: FormBuilder, private modalController: ModalController) {
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

  closeModal(): void {
    this.modalController.dismiss();
  }

  async openLoginModal(): Promise<void> {
    await this.modalController.dismiss();
  
    const modal = await this.modalController.create({
      component: LoginModalComponent,
    });
    await modal.present();
  }
  

  register(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Datos del formulario de registro:', formData);

      // Aquí puedes integrar la API para enviar los datos de registro.
      this.closeModal();
    }
  }
}
