import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
  standalone: false,
})
export class RegisterModalComponent {
  registerForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private modalController: ModalController) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    }
  }

  closeModal(): void {
    this.modalController.dismiss();
  }

  register(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Datos del formulario de registro:', formData);

      // Lógica para enviar los datos a la API
      this.closeModal();
    }
  }
}
