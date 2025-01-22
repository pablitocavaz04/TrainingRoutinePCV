import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SesionesService } from 'src/app/services/sesiones/sesiones.service';

@Component({
  selector: 'app-crear-sesion-modal',
  templateUrl: './crear-sesion-modal.component.html',
  styleUrls: ['./crear-sesion-modal.component.scss'],
  standalone:false
})
export class CrearSesionModalComponent implements OnInit {
  sesionForm: FormGroup;
  entrenadores: any[] = [];
  entrenamientos: any[] = [];
  jugadores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private sesionesService: SesionesService
  ) {
    this.sesionForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: [false],
      entrenador: ['', Validators.required],
      entrenamiento: ['', Validators.required],
      jugadores: [[], Validators.required],
    });
  }

  ngOnInit() {
    this.cargarEntrenadores();
    this.cargarEntrenamientos();
    this.cargarJugadores();
  }
  cargarEntrenadores() {
    this.sesionesService.getEntrenadores().subscribe({
      next: (response) => {
        this.entrenadores = response.data.map((item: any) => ({
          id: item.id,
          nombre: item.attributes.user?.data?.attributes?.username || 'Sin nombre',
        }));
      },
      error: (err) => {
        console.error('Error al cargar entrenadores:', err);
      },
    });
  }
  
  cargarJugadores() {
    this.sesionesService.getJugadores().subscribe({
      next: (response) => {
        this.jugadores = response.data.map((item: any) => ({
          id: item.id,
          nombre: item.attributes.user?.data?.attributes?.username || 'Sin nombre',
        }));
      },
      error: (err) => {
        console.error('Error al cargar jugadores:', err);
      },
    });
  }
  
  cargarEntrenamientos() {
    this.sesionesService.getEntrenamientos().subscribe({
      next: (response) => {
        this.entrenamientos = response.map((item: any) => ({
          id: item.id,
          nombre: item.attributes.nombre,
        }));
      },
      error: (err) => {
        console.error('Error al cargar entrenamientos:', err);
      },
    });
  }

  crearSesion() {
    if (this.sesionForm.valid) {
      const sesionData = this.sesionForm.value;
      this.sesionesService.crearSesion(sesionData).subscribe({
        next: (response) => {
          console.log('Sesión creada:', response);
          this.cerrarModal(true); // Cerramos el modal y enviamos un indicador al HomePage
        },
        error: (err) => {
          console.error('Error al crear sesión:', err);
        },
      });
    }
  }
  
  cerrarModal(reload: boolean = false) {
    this.modalCtrl.dismiss({ reload });
  }
  
}
