import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
