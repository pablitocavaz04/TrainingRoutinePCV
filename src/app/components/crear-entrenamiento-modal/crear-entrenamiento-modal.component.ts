import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrenamientosService } from 'src/app/services/entrenamientos/entrenamientos.service';

@Component({
  selector: 'app-crear-entrenamiento-modal',
  templateUrl: './crear-entrenamiento-modal.component.html',
  styleUrls: ['./crear-entrenamiento-modal.component.scss'],
  standalone:false
})
export class CrearEntrenamientoModalComponent {
  entrenamientoForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private entrenamientosService: EntrenamientosService
  ) {
    this.entrenamientoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  crearEntrenamiento() {
    if (this.entrenamientoForm.valid) {
      const nuevoEntrenamiento = this.entrenamientoForm.value;

      this.entrenamientosService.crearEntrenamiento(nuevoEntrenamiento).subscribe(
        (response) => {
          console.log('Entrenamiento creado:', response);
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al crear el entrenamiento:', error);
        }
      );
    }
  }
}
