import { Component, OnInit } from '@angular/core';
import { SesionesService } from 'src/app/services/sesiones/sesiones.service';
import { ModalController } from '@ionic/angular';
import { CrearSesionModalComponent } from 'src/app/components/crear-sesion-modal/crear-sesion-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  sesiones: any[] = [];

  constructor(
    private sesionesService: SesionesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cargarSesiones();
  }

  cargarSesiones() {
    this.sesionesService.getSesiones().subscribe({
      next: (sesiones) => {
        this.sesiones = sesiones.map((item: any) => ({
          id: item.id,
          nombre: item.attributes.nombre,
          estado: item.attributes.estado,
          imagen:
            item.attributes.sesionpicture?.data?.attributes?.formats?.thumbnail?.url ||
            item.attributes.sesionpicture?.data?.attributes?.url,
        }));
      },
      error: (err) => {
        console.error('Error al cargar sesiones:', err);
      },
    });
  }

  async abrirModalCrearSesion() {
    const modal = await this.modalCtrl.create({
      component: CrearSesionModalComponent,
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data?.reload) {
      this.cargarSesiones(); // Recarga la lista de sesiones si se ha creado una nueva
    }
  }
  

  editarSesion(sesion: any) {
    console.log('Editar sesión:', sesion);
  }

  eliminarSesion(sesion: any) {
    console.log('Eliminar sesión:', sesion);
  }
}
