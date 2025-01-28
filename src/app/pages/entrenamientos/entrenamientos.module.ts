import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { EntrenamientosPageRoutingModule } from './entrenamientos-routing.module';

import { EntrenamientosPage } from './entrenamientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenamientosPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [EntrenamientosPage]
})
export class EntrenamientosPageModule {}
