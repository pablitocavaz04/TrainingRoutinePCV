import { Component, OnInit } from '@angular/core';
import lottie from 'lottie-web';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: false,
})
export class SplashPage implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const animationContainer = document.getElementById('lottie-animation');
    if (animationContainer) {
      lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/loading.json', // Ruta al archivo Lottie
      });
    } else {
      console.error('No se encontró el contenedor para la animación Lottie');
    }

    // Leer el parámetro redirect
    this.route.queryParams.subscribe((params) => {
      const redirectTo = params['redirect'] || '/landing'; // Por defecto, ir a /landing
      setTimeout(() => {
        this.router.navigate([redirectTo]); // Navegar al destino indicado
      }, 3000); // Esperar 3 segundos
    });
  }
}
