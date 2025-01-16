import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isSplashOrLanding = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Comprueba si la ruta actual es splash o landing
        this.isSplashOrLanding = event.urlAfterRedirects.includes('/splash') || event.urlAfterRedirects.includes('/landing');
      }
    });
  }
}
