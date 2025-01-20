import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenamientosPage } from './entrenamientos.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenamientosPageRoutingModule {}
