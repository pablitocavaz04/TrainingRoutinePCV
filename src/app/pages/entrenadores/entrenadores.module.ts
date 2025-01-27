import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrenadoresPageRoutingModule } from './entrenadores-routing.module';

import { EntrenadoresPage } from './entrenadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenadoresPageRoutingModule
  ],
  declarations: [EntrenadoresPage]
})
export class EntrenadoresPageModule {}
