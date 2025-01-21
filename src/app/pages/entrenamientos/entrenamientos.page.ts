import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EntrenamientosService, Entrenamiento } from 'src/app/services/entrenamientos/entrenamientos.service';
import { CrearEntrenamientoModalComponent } from 'src/app/components/crear-entrenamiento-modal/crear-entrenamiento-modal.component';

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.page.html',
  styleUrls: ['./entrenamientos.page.scss'],
  standalone: false,
})
export class EntrenamientosPage implements OnInit {
  entrenamientos: {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    imagen?: string;
  }[] = [];

  constructor(
    private entrenamientosService: EntrenamientosService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarEntrenamientos();
  }

  cargarEntrenamientos() {
    this.entrenamientosService.getEntrenamientos().subscribe((response) => {
      this.entrenamientos = response.data.map((item: Entrenamiento) => {
        return {
          id: item.id,
          nombre: item.attributes.nombre,
          descripcion: item.attributes.descripcion,
          fecha: item.attributes.fecha,
          imagen:
            item.attributes.entreno?.data?.attributes?.formats?.thumbnail?.url ||
            item.attributes.entreno?.data?.attributes?.url,
        };
      });
    });
  }

  async abrirModalCrearEntrenamiento() {
    const modal = await this.modalCtrl.create({
      component: CrearEntrenamientoModalComponent,
      cssClass: 'custom-modal-large'
    });

    // Recargar la lista al cerrar el modal
    modal.onDidDismiss().then(() => {
      this.cargarEntrenamientos();
    });

    await modal.present();
  }

  async abrirModalEditarEntrenamiento(entrenamiento: any) {
    const modal = await this.modalCtrl.create({
      component: CrearEntrenamientoModalComponent,
      cssClass: 'custom-modal-large',
      componentProps: {
        modoEdicion: true, // Indica que es para editar
        entrenamientoData: entrenamiento, // Pasa los datos del entrenamiento
      },
    });

    // Recargar la lista al cerrar el modal
    modal.onDidDismiss().then(() => {
      this.cargarEntrenamientos();
    });

    await modal.present();
  }

  async confirmarEliminacion(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este entrenamiento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.eliminarEntrenamiento(id);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  eliminarEntrenamiento(id: number) {
    this.entrenamientosService.eliminarEntrenamiento(id).subscribe(
      () => {
        console.log(`Entrenamiento con ID ${id} eliminado correctamente.`);
        this.cargarEntrenamientos(); // Actualiza el listado
      },
      (error) => {
        console.error('Error al eliminar el entrenamiento:', error);
      }
    );
  }
}