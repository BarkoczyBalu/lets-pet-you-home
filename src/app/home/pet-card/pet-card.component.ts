import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Breed } from 'src/interfaces/breed';
import { Pet } from 'src/interfaces/pet';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {
  @Input() pet: Pet | undefined;
  @Input() breed: Breed | undefined;

  @Output() stateChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  public changeToBreedView(pet: Pet): void {
    this.stateChange.emit(pet);
  }

}
