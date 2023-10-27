import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public timer: number = 0;
  private intervalRef?: NodeJS.Timeout;

  get isTimerMod1() {
    return this.timer % 3 === 1;
  }
  get isTimerMod2() {
    return this.timer % 3 === 2;
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.intervalRef = setInterval(() => this.timer++, 750);

    if (!this.authService.isLoading) {
      clearInterval(this.intervalRef);
    }
  }

  public async loginUser() {
    await this.authService.signInUser(this.loginForm.value.email, this.loginForm.value.password);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }
}
