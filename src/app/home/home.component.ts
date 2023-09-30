import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Pet } from '../../interfaces/pet';
import { PetService } from '../services/pet.service';
import { Subscription } from 'rxjs';
import { Breed } from 'src/interfaces/breed';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  @ViewChild('counterModal') counterModal?: ElementRef;
  
  // Mock data
  // public pets: Array<Pet> = [
  //   {
  //     id: '1',
  //     name: 'Dogs',
  //     img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
  //     total: 20,
  //     breeds: [
  //       {
  //         name: 'Samoyed',
  //         img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
  //       },
  //       {
  //         name: 'Shiba Inu',
  //         img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
  //       },
  //     ],
  //     isDeletable: false,
  //     isFavorite: true
  //   },
  //   {
  //     id: '2',
  //     name: 'Cats',
  //     img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
  //     total: 10,
  //     breeds: [
  //       {
  //         name: 'Ordinary House Cat',
  //         img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80'
  //       },
  //     ],
  //     isDeletable: false,
  //     isFavorite: true
  //   },
  //   {
  //     id: '3',
  //     name: 'Dogs',
  //     img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
  //     total: 20,
  //     breeds: [
  //       {
  //         name: 'Samoyed',
  //         img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
  //       },
  //       {
  //         name: 'Shiba Inu',
  //         img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
  //       },
  //     ],
  //     isDeletable: false,
  //     isFavorite: true
  //   },
  //   {
  //     id: '4',
  //     name: 'Cats',
  //     img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
  //     total: 10,
  //     breeds: [
  //       {
  //         name: 'Ordinary House Cat',
  //         img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80'
  //       },
  //     ],
  //     isDeletable: false,
  //     isFavorite: true
  //   },
  //   {
  //     id: '5',
  //     name: 'Dogs',
  //     img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
  //     total: 20,
  //     breeds: [
  //       {
  //         name: 'Samoyed',
  //         img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
  //       },
  //       {
  //         name: 'Shiba Inu',
  //         img: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
  //       },
  //     ],
  //     isDeletable: false,
  //     isFavorite: true
  //   },
  //   {
  //     id: '6',
  //     name: 'Cats',
  //     img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80',
  //     total: 10,
  //     breeds: [
  //       {
  //         name: 'Ordinary House Cat',
  //         img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80'
  //       },
  //     ],
  //     isDeletable: false,
  //     isFavorite: true
  //   },
  // ];
  public pets: Array<Pet> = [];

  public selectedPet!: Pet;
  public selectedBreed?: Breed;
  public selectedBreeds: Array<Breed> = [];

  constructor(
    public petService: PetService
  ) { 
    this.subscriptions.push(this.petService.getPets().subscribe((data) => {
      this.pets = data;
      this.selectedPet = data[0];
    }));
  }

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.counterModal?.nativeElement.addEventListener('hide.bs.modal', (e: any) => {
      this.addBreedToSelectedBreeds();
    });
  }
  
  public changePets(id: string) {
    const pet = this.pets.find((pet) => pet.id === id) ?? this.pets[0];
    this.selectedPet = pet;
  }

  // public selectBreed(breed: Breed) {
  //   if (this.selectedBreeds.some((sbreed) => sbreed.name == breed.name)) {
  //     const index = this.selectedBreeds.indexOf(this.selectedBreeds.find((sbreed) => sbreed.name == breed.name)!);
  //     this.selectedBreeds.splice(index,1);
  //   } else {
  //     this.selectedBreeds.push(breed);
  //   }
  // }

  public selectBreed(breed: Breed) {
    this.selectedBreed = breed;
  }

  public increaseAddCounter() {
    if (this.selectedBreed) this.selectedBreed.addCounter!++;
  }

  public decreaseAddCounter() {
    if (this.selectedBreed && this.selectedBreed.addCounter! > 0) this.selectedBreed.addCounter!--;
  }

  public addBreedToSelectedBreeds() {
    const index = this.selectedBreeds.indexOf(this.selectedBreeds.find((sbreed) => sbreed.name == this.selectedBreed!.name)!);
    if (!this.selectedBreed?.addCounter) {
      this.selectedBreeds.splice(index,1);
    } else {
      if (this.selectedBreeds.some((sbreed) => sbreed.name == this.selectedBreed!.name)) this.selectedBreeds.splice(index,1);
      this.selectedBreeds.push(this.selectedBreed!);
    }
  }

  public removeBreedFromSelectedBreeds(breed: Breed) {
    if (this.selectedBreeds.some((sbreed) => sbreed.name == breed.name)) {
      const index = this.selectedBreeds.indexOf(this.selectedBreeds.find((sbreed) => sbreed.name == breed.name)!);
      this.selectedBreeds.splice(index,1);
      breed.addCounter = 0;
    }
  }

  public isSelectedBreed(breed: Breed): boolean {
    return this.selectedBreeds.some((sbreed) => sbreed.name == breed.name);
  }

  public addBreed() {
    this.petService.addBreed(this.selectedBreeds);
    this.selectedBreeds = [];
  }

  public changeToBreedView(pet: Pet) {
    this.selectedPet = pet;
    this.petService.viewState = 'breed';
  }

  public changeToPetView() {
    this.selectedPet = this.pets[0];
    this.petService.viewState = 'pet';
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
