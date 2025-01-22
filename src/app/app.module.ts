import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import { HttpClientModule } from '@angular/common/http';
import player from 'lottie-web';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ShowPasswordPipe } from './pipes/show-password.pipe';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CrearEntrenamientoModalComponent } from './components/crear-entrenamiento-modal/crear-entrenamiento-modal.component';
import { CrearSesionModalComponent } from './components/crear-sesion-modal/crear-sesion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    RegisterModalComponent,
    ShowPasswordPipe,
    NavigationBarComponent,
    CrearEntrenamientoModalComponent,
    CrearSesionModalComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  HttpClientModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideLottieOptions({
      player: () => player,
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
