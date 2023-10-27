import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public view: 'pet' | 'breed' = 'pet';

  constructor(
    public authService: AuthService,
    public petService: PetService
  ) { }

  ngOnInit(): void {
    this.petService.viewState.subscribe(view => this.view = view);
  }

  public changeToPetView() {
    this.petService.viewState.next('pet');
  }

  public logoutUser() {
    this.authService.signOutUser();
  }

}
