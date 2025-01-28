import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SesionesService } from 'src/app/services/sesiones/sesiones.service';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { TranslateService } from '@ngx-translate/core'; // Importar TranslateService

@Component({
  selector: 'app-crear-sesion-modal',
  templateUrl: './crear-sesion-modal.component.html',
  styleUrls: ['./crear-sesion-modal.component.scss'],
  standalone: false,
})
export class CrearSesionModalComponent implements OnInit {
  @Input() sesion: any;
  sesionForm: FormGroup;
  entrenadores: any[] = [];
  entrenamientos: any[] = [];
  jugadores: any[] = [];
  imagenSesion: string | null = null; // Vista previa de la imagen
  archivoSesion: File | null = null; // Archivo seleccionado
  tituloModal: string = '';
  textoBoton: string = '';


  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private sesionesService: SesionesService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) {
    this.sesionForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: [false],
      entrenador: ['', Validators.required],
      entrenamiento: ['', Validators.required],
      jugadores: [[], Validators.required],
    });
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  ngOnInit() {
    this.tituloModal = this.sesion
    ? this.translate.instant('SessionsModal.EditTitle')
    : this.translate.instant('SessionsModal.CreateTitle');

  this.textoBoton = this.sesion
    ? this.translate.instant('SessionsModal.UpdateButton')
    : this.translate.instant('SessionsModal.CreateButton');
    this.cargarEntrenadores();
    this.cargarEntrenamientos();
    this.cargarJugadores();

    if (this.sesion) {
      console.log('Sesion recibida para editar:', this.sesion);
      this.cargarDatosSesion();
    }
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

  cargarDatosSesion() {
    this.sesionForm.patchValue({
      nombre: this.sesion.attributes.nombre,
      estado: this.sesion.attributes.estado,
      entrenador: this.sesion.attributes.entrenador?.data?.id || null,
      entrenamiento: this.sesion.attributes.entrenamiento?.data?.id || null,
      jugadores: this.sesion.attributes.jugadores?.data?.map((j: any) => j.id) || [],
    });

    if (this.sesion.attributes.sesionpicture?.data?.attributes?.url) {
      this.imagenSesion = this.sesion.attributes.sesionpicture.data.attributes.url;
    }
  }

  guardarSesion(sesionData: any, imagenId?: number) {
    if (imagenId) {
      sesionData.sesionpicture = imagenId;
    }

    if (this.sesion) {
      // Actualizar sesión
      this.sesionesService.actualizarSesion(this.sesion.id, sesionData).subscribe({
        next: (response) => {
          console.log('Sesión actualizada:', response);
          this.cerrarModal(true);
        },
        error: (err) => {
          console.error('Error al actualizar la sesión:', err);
        },
      });
    } else {
      // Crear sesión
      const formData = new FormData();
      formData.append('data', JSON.stringify(sesionData));
      this.sesionesService.crearSesion(formData).subscribe({
        next: (response) => {
          console.log('Sesión creada:', response);
          this.cerrarModal(true);
        },
        error: (err) => {
          console.error('Error al crear la sesión:', err);
        },
      });
    }
  }

  crearSesion() {
    if (this.archivoSesion) {
      this.sesionesService.subirImagen(this.archivoSesion).subscribe({
        next: (response) => {
          const imagenId = response[0]?.id;
          this.guardarSesion(this.sesionForm.value, imagenId);
        },
        error: (err) => {
          console.error('Error al subir la imagen:', err);
        },
      });
    } else {
      this.guardarSesion(this.sesionForm.value);
    }
  }

  actualizarSesion() {
    if (this.archivoSesion) {
      this.sesionesService.subirImagen(this.archivoSesion).subscribe({
        next: (response) => {
          const imagenId = response[0]?.id;
          this.guardarSesion(this.sesionForm.value, imagenId);
        },
        error: (err) => {
          console.error('Error al subir la imagen:', err);
        },
      });
    } else {
      this.guardarSesion(this.sesionForm.value);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
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
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenSesion = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('El archivo seleccionado no es una imagen válida.');
    }
  }

  cerrarModal(reload: boolean = false) {
    this.modalCtrl.dismiss({ reload });
  }
}
