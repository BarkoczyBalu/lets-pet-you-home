import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-notification style="position: fixed; z-index: 99999;
    top: 5%; left: 50%;
    transform: translate(-50%, -50%);" aria-live="polite" aria-atomic="true"></app-notification>
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(authService: AuthService) {
    authService.checkLoggedInUser();
  }
}
