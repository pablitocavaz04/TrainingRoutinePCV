import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresPage } from './jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresPageRoutingModule {}
