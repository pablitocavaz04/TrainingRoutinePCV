import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SesionesService } from 'src/app/services/sesiones/sesiones.service';

@Component({
  selector: 'app-crear-sesion-modal',
  templateUrl: './crear-sesion-modal.component.html',
  styleUrls: ['./crear-sesion-modal.component.scss'],
  standalone: false,
})
export class CrearSesionModalComponent implements OnInit {
  sesionForm: FormGroup;
  entrenadores: any[] = [];
  entrenamientos: any[] = [];
  jugadores: any[] = [];
  imagenSesion: string | ArrayBuffer | null = null; // Vista previa de la imagen
  archivoSesion: File | null = null; // Archivo seleccionado

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

  // Métodos de Drag and Drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
    const area = event.currentTarget as HTMLElement;
    area.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    const area = event.currentTarget as HTMLElement;
    area.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const area = event.currentTarget as HTMLElement;
    area.classList.remove('dragover');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      this.archivoSesion = file;

      // Generar vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenSesion = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('El archivo seleccionado no es una imagen válida.');
    }
  }

  crearSesion() {
    if (this.sesionForm.valid && this.archivoSesion) {
      const sesionData = this.sesionForm.value;

      // Crear FormData para subir la imagen y los datos
      const formData = new FormData();
      formData.append('data', JSON.stringify(sesionData));
      formData.append('files.sesionpicture', this.archivoSesion);

      this.sesionesService.crearSesion(formData).subscribe({
        next: (response) => {
          console.log('Sesión creada con éxito:', response);
          this.cerrarModal(true);
        },
        error: (err) => {
          console.error('Error al crear sesión:', err);
        },
      });
    } else {
      console.error('El formulario no es válido o no se ha seleccionado una imagen.');
    }
  }

  cerrarModal(reload: boolean = false) {
    this.modalCtrl.dismiss({ reload });
  }
}
