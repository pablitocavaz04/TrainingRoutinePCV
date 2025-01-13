import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone:false,
})
export class LandingPage {
  constructor(private router: Router) {}

  navigateToNextPage() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/home']); // Redirige al Home si hay token
    } else {
      this.router.navigate(['/login']); // Redirige al Login si no hay token
    }
  }
}
