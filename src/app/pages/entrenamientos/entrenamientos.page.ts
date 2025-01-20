import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController
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
    });

    // Recargar la lista al cerrar el modal
    modal.onDidDismiss().then(() => {
      this.cargarEntrenamientos();
    });

    await modal.present();
  }
}
