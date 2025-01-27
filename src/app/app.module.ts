import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import player from 'lottie-web';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideLottieOptions({
      player: () => player,
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
