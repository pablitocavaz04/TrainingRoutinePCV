import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenadoresPage } from './entrenadores.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenadoresPageRoutingModule {}
