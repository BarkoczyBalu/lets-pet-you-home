import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Pet } from '../../interfaces/pet';
import { PetService } from '../services/pet.service';
import { Subscription } from 'rxjs';
import { Breed } from 'src/interfaces/breed';
import { Record } from 'src/interfaces/record';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  @ViewChild('offcanvasBottom') offcanvasBottom?: ElementRef;
  @ViewChild('counterModal') counterModal?: ElementRef;
  @ViewChild('timelineModal') timelineModal?: ElementRef;
  
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
  public view: 'pet' | 'breed' = 'pet';

  public selectedPet!: Pet;
  public selectedPetBadge!: Pet;
  public selectedBreed?: Breed;
  public selectedBreedRecords?: Record[];
  public selectedBreeds: Array<Breed> = [];
  public newRecord: Record = {
    userId: '',
    breeds: {}
  };

  public get newRecordBreedsLength(): number {
    return Object.keys(this.newRecord.breeds).length;
  }
  
  public addCounter: number = 0;

  constructor(
    public authService: AuthService,
    public petService: PetService,
    private notificationService: NotificationService
  ) { 
    this.subscriptions.push(this.petService.getPets().subscribe((data) => {
      this.pets = data;
      this.selectedPetBadge = data.find(pet => pet.name === 'Dogs') ?? data[0];
      this.petService.getUserPets(data);
    }));
    this.subscriptions.push(this.petService.viewState.subscribe(view => {
      if (view === 'pet') this.selectedPetBadge = this.pets.find(pet => pet.name === 'Dogs') ?? this.pets[0];
      this.view = view;
    }));
  }

  public ngOnInit(): void {
    this.newRecord.userId = this.authService.user!.uid;
  }

  public ngAfterViewInit(): void {
    const resetSelectedBreed = () => setTimeout(() => this.selectedBreed = undefined, 200);

    this.offcanvasBottom?.nativeElement.addEventListener('hide.bs.offcanvas', (e: any) => {
      resetSelectedBreed();
    });

    this.timelineModal?.nativeElement.addEventListener('hide.bs.modal', (e: any) => {
      resetSelectedBreed();
    });
  }
  
  public changePets(id: string) {
    const pet = this.pets.find((pet) => pet.id === id) ?? this.pets[0];
    this.selectedPetBadge = pet;
  }

  public addBreedToRecord(breed: Breed) {
    if (!this.newRecord!.breeds[breed.id]) this.newRecord!.breeds[breed.id] = 0;

    this.selectedBreed = breed;
    this.newRecord!.breeds[breed.id]++;
  }

  public removeBreedFromRecord(breed: Breed) {
    if (this.newRecord.breeds[breed.id]) delete(this.newRecord.breeds[breed.id]);
  }

  public addRecord() {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 3600000,
    };

    if (this.newRecord.location) delete(this.newRecord.location);
    // navigator.geolocation.watchPosition(this.allowedPosition, this.deniedPosition, options);
    this.deniedPosition();
  }

  // private allowedPosition = (pos: GeolocationPosition) => {
  //   this.newRecord.location = { lat: pos.coords.latitude, long: pos.coords.longitude };
  //   this.deniedPosition();
  // }
  
  private deniedPosition = () => {
    this.petService.addRecord(this.newRecord, new Date().toISOString());
    this.newRecord.breeds = {};
    this.petService.getUserPets(this.pets);
    setTimeout(() => {
      const milestones = this.pets.map((pet) => this.closestMilestone(pet.total, 50));
      this.pets.forEach((pet, index) => {
        if (milestones[index] && pet.total >= milestones[index]) this.notificationService.show(`Good job! You have collected ${milestones[index]} ${pet.name.toLowerCase()}`);
        const breedMilestones = pet.ownedBreeds!.map((breed) => this.closestMilestone(breed.counter!, 25));
        if (pet.ownedBreeds) pet.ownedBreeds.forEach((breed, index) => {
          if (breedMilestones[index] && breed.counter! >= breedMilestones[index]) this.notificationService.show(`Good job! You have collected ${breedMilestones[index]} ${breed.name}s`);
        });
      });
    }, 1000);
  }

  private closestMilestone(totalBefore: number, divider: number = 50) {
      const q = totalBefore / divider;
      const n1 = divider * Math.ceil(q);
      const n2 = (totalBefore * divider) > 0 ? (divider * (q + 1)) : (divider * (q - 1));

      return Math.abs(totalBefore - n1) < Math.abs(totalBefore - n2) ? n1 : n2;
  }

  public changeToBreedView(pet: Pet) {
    this.selectedPet = pet;
    this.petService.viewState.next('breed');
  }

  public openBreedRecords(breed: Breed) {
    this.selectedBreed = breed;

    this.subscriptions.push(
      this.petService.getBreedRecords(breed.id).subscribe((data) => {
        this.selectedBreedRecords = data;
      })
    );

    const timelineModal = new bootstrap.Modal(document.getElementById('timelineModal'), {});
    timelineModal.show();
  }

  public showNotification() {
    this.notificationService.show('Test');
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
