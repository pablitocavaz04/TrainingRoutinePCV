import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadoresPageRoutingModule } from './jugadores-routing.module';

import { JugadoresPage } from './jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadoresPageRoutingModule
  ],
  declarations: [JugadoresPage]
})
export class JugadoresPageModule {}
