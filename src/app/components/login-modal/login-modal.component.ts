import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  standalone: false,
})
export class LoginModalComponent {
  loginForm: FormGroup;
  passwordVisible = false;
  repeatPasswordVisible = false;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'repeatPassword') {
      this.repeatPasswordVisible = !this.repeatPasswordVisible;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password, repeatPassword } = this.loginForm.value;
      if (password !== repeatPassword) {
        console.error('Passwords do not match');
        this.loginForm.get('repeatPassword')?.setErrors({ mustMatch: true });
        return;
      }
      console.log('Login credentials:', email, password);
      this.modalCtrl.dismiss();
    } else {
      console.log('Form is invalid');
    }
  }

  async openRegisterModal(): Promise<void> {
    await this.modalCtrl.dismiss();
  
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
    });
    await modal.present();
  }
  
}
