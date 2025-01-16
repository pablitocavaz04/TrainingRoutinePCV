import { Component, HostListener } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone:false
})
export class NavigationBarComponent {
  menuOpen = false;
  isScrolled = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }  
}
