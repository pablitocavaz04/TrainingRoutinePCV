import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule),
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'entrenamientos',
    loadChildren: () => import('./pages/entrenamientos/entrenamientos.module').then( m => m.EntrenamientosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'jugadores',
    loadChildren: () => import('./pages/jugadores/jugadores.module').then( m => m.JugadoresPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'entrenadores',
    loadChildren: () => import('./pages/entrenadores/entrenadores.module').then( m => m.EntrenadoresPageModule),
    canActivate: [AuthGuard],
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
