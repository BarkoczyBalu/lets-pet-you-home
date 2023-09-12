import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Breed, Pet } from '../../interfaces/pet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('offcanvasBottom') offcanvasBottom!: ElementRef;

  public pets: Array<Pet> = [
    {
      id: 1,
      name: 'Dogs',
      img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
      total: 20,
      breeds: [
        {
          name: 'Samoyed',
          img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
        },
        {
          name: 'Shiba Inu',
          img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
        },
      ],
      isDeletable: false,
      isFavorite: true
    },
    {
      id: 2,
      name: 'Cats',
      img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
      total: 10,
      breeds: [
        {
          name: 'Ordinary House Cat',
          img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80'
        },
      ],
      isDeletable: false,
      isFavorite: true
    },
    {
      id: 3,
      name: 'Dogs',
      img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
      total: 20,
      breeds: [
        {
          name: 'Samoyed',
          img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
        },
        {
          name: 'Shiba Inu',
          img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
        },
      ],
      isDeletable: false,
      isFavorite: true
    },
    {
      id: 4,
      name: 'Cats',
      img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
      total: 10,
      breeds: [
        {
          name: 'Ordinary House Cat',
          img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80'
        },
      ],
      isDeletable: false,
      isFavorite: true
    },
    {
      id: 5,
      name: 'Dogs',
      img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
      total: 20,
      breeds: [
        {
          name: 'Samoyed',
          img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
        },
        {
          name: 'Shiba Inu',
          img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
        },
      ],
      isDeletable: false,
      isFavorite: true
    },
    {
      id: 6,
      name: 'Cats',
      img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
      total: 10,
      breeds: [
        {
          name: 'Ordinary House Cat',
          img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80'
        },
      ],
      isDeletable: false,
      isFavorite: true
    },
  ];

  public selectedPet: Pet = this.pets[0];
  public selectedBreeds: Array<Breed> = [];

  constructor() { }

  ngOnInit(): void {
  }
  
  public changeBreeds(e: any) {
    const pet = this.pets.find((pet) => pet.id == e.target.value) ?? this.pets[0];
    this.selectedPet = pet;
  }

  public selectBreed(breed: Breed) {
    if (this.selectedBreeds.some((sbreed) => sbreed.name == breed.name)) {
      const index = this.selectedBreeds.indexOf(this.selectedBreeds.find((sbreed) => sbreed.name == breed.name)!);
      this.selectedBreeds.splice(index,1);
    } else {
      this.selectedBreeds.push(breed);
    }
  }

  public isSelectedBreed(breed: Breed): boolean {
    return this.selectedBreeds.some((sbreed) => sbreed.name == breed.name);
  }

  public addPets() {
    this.selectedBreeds = [];
    // console.log(this.offcanvasBottom.nativeElement);
    // this.offcanvasBottom.nativeElement.hide();
  }
}
