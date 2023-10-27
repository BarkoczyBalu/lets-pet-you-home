import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(authService: AuthService) {
    authService.checkLoggedInUser();
  }
}
