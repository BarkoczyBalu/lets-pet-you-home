import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Pet } from '../../interfaces/pet';
import { PetService } from '../services/pet.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('offcanvasBottom') offcanvasBottom?: ElementRef;
  @ViewChild('timelineModal') timelineModal?: ElementRef;
  @ViewChild('searchInput') searchInput?: ElementRef;
  @ViewChild('petsDropup') petsDropup?: ElementRef;
  
  public pets: Pet[] = [];
  public view: 'pet' | 'breed' = 'pet';

  // TODO: Come up with new naming convention
  public selectedPet!: Pet;
  public selectedPetBadge!: Pet;
  public selectedBreed?: Breed;
  public selectedBreedRecords?: Record[];
  public selectedBreeds: Breed[] = [];
  
  public isSearching: boolean = false;
  public filteredBreeds: Breed[] = [];
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
    this.petService.getUserPets().pipe(takeUntilDestroyed()).subscribe((pets: Pet[]) => {
      this.pets = pets;
      this.selectedPetBadge = pets.find((pet) => pet.name === 'Dogs') ?? pets[0];
      this.filteredBreeds = this.selectedPetBadge.breeds;
    });
    this.petService.viewState.pipe(takeUntilDestroyed()).subscribe(view => {
      if (view === 'pet') this.selectedPetBadge = this.pets.find(pet => pet.name === 'Dogs') ?? this.pets[0];
      this.view = view;
    });
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
    this.filteredBreeds = this.selectedPetBadge.breeds;
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
    const milestones = this.pets.map((pet) => this.closestMilestone(pet.total, 50));
    const breedMilestones = this.pets.map((pet) => pet.ownedBreeds!.map((breed) => this.closestMilestone(breed.counter!, 25)));
    const sub = this.petService.getUserPets().subscribe((pets: Pet[]) => {
      this.pets = pets;
      this.pets.forEach((pet, index) => {
        if (milestones[index] && pet.total >= milestones[index]) this.notificationService.show(`Pawntastic! You have collected ${milestones[index]} ${pet.name.toLowerCase()}`);
        if (pet.ownedBreeds) pet.ownedBreeds.forEach((breed, breedIndex) => {
          if (breedMilestones[index][breedIndex] && breed.counter! >= breedMilestones[index][breedIndex]) this.notificationService.show(`Pawntastic! You have collected ${breedMilestones[index][breedIndex]} ${breed.name}s`);
        });
      });
      sub.unsubscribe();
    });

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

    this.petService.getBreedRecords(breed.id).pipe(takeUntilDestroyed()).subscribe((data) => {
      this.selectedBreedRecords = data;
    });

    const timelineModal = new bootstrap.Modal(document.getElementById('timelineModal'), {});
    timelineModal.show();
  }

  public searchBreed(event: any) {
    const key = event.target.value.toLowerCase();
    this.isSearching = !!key.length;
    this.petsDropup!.nativeElement.style.display = 'none';

    this.filteredBreeds = this.selectedPetBadge?.breeds.filter((breed) => breed.name.toLowerCase().includes(key));
  }

  public clearSearch() {
    this.searchInput!.nativeElement.value = '';
    this.searchBreed({target: {value: ''}});
    this.searchInput?.nativeElement.focus();
  }

  public showPetsDropdown() {
    const currentDisplayValue = this.petsDropup!.nativeElement.style.display;
    this.petsDropup!.nativeElement.style.display = currentDisplayValue === 'none' ? 'block' : 'none';
  }
}
