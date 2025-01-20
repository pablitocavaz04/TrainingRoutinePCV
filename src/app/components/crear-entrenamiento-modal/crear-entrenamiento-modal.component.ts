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
  isDragging = false;
  imagenSeleccionada: File | null = null;
  imagenPreview: string | null = null;
  errorImagen: string | null = null;

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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.procesarImagen(file);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.procesarImagen(file);
    }
  }

  procesarImagen(file: File) {
    if (file.type.startsWith('image/')) {
      this.imagenSeleccionada = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.errorImagen = null;
    } else {
      this.errorImagen = 'El archivo seleccionado no es una imagen válida.';
    }
  }

  crearEntrenamiento() {
    if (this.entrenamientoForm.valid) {
      const nuevoEntrenamiento = this.entrenamientoForm.value;
  
      // Subir la imagen primero, si existe
      if (this.imagenSeleccionada) {
        this.entrenamientosService.subirImagen(this.imagenSeleccionada).subscribe(
          (response) => {
            const imagenId = response[0].id; // Obtener el ID de la imagen subida
            this.guardarEntrenamiento(nuevoEntrenamiento, imagenId);
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            this.errorImagen = 'Error al subir la imagen.';
          }
        );
      } else {
        this.guardarEntrenamiento(nuevoEntrenamiento);
      }
    }
  }
  

  guardarEntrenamiento(entrenamiento: any, imagenId?: number) {
    const entrenamientoData = {
      ...entrenamiento,
      entreno: imagenId, // Relacionar la imagen al campo 'entreno'
    };
  
    this.entrenamientosService.crearEntrenamiento(entrenamientoData).subscribe(
      (response) => {
        console.log('Entrenamiento creado con imagen:', response);
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al crear el entrenamiento:', error);
      }
    );
  }
  
}
