import { Component, OnInit } from '@angular/core';
import lottie from 'lottie-web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:false
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const animationContainer = document.getElementById('lottie-animation');
    if (animationContainer) {
      lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/loading.json' // Ruta al archivo Lottie
      });
    } else {
      console.error('No se encontró el contenedor para la animación Lottie');
    }

    setTimeout(() => {
      this.router.navigate(['/landing']); 
    }, 3000); 
  }
}
