import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pet } from 'src/interfaces/pet';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breed } from 'src/interfaces/breed';
import { Record } from 'src/interfaces/record';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsCollection = this.afs.collection<Pet>('pets');
  private breedsCollection = this.afs.collection<Breed>('breeds');
  private recordsCollection = this.afs.collection<Record>('records');

  public viewState: BehaviorSubject<'pet' | 'breed'> = new BehaviorSubject<'pet' | 'breed'>('pet');

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  private sortByName(a: any, b:any) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  };

  public async getUserPets(allPets: Array<Pet>): Promise<any> {
    this.recordsCollection = this.afs.collection<Record>('records', ref => ref.where('userId', "==", this.authService.user?.uid));
    let userBreeds: any = {};

    return this.recordsCollection.get().pipe(
      map((records) => records.docs.forEach((record) => {
        const recordBreeds = record.data().breeds;

        Object.keys(recordBreeds).forEach((breedId) => {
          if ((Object.keys(userBreeds)).includes(breedId)) {
            userBreeds[breedId] += recordBreeds[breedId];
          } else {
            userBreeds[breedId] = recordBreeds[breedId];
          }
        });

        allPets.forEach((pet) => {
          pet.breeds.forEach((breed: Breed) => {
            if (breed.counter) delete(breed.counter);
            if (userBreeds[breed.id]) breed.counter = userBreeds[breed.id];
          });
          pet.total = pet.breeds.reduce((sum, breed) => breed.counter ? (sum + breed.counter) : sum, 0);
        });
      }))
    ).subscribe(() => allPets);

    // return this.petsCollection.get().pipe(
    //   map((pets) => pets.docs.map((pet) => {
    //     const convertedPet = pet.data();
    //     convertedPet.id = pet.id;

    //     const petsBreedCollection = this.afs.collection<Breed>('breeds', ref => ref.where('petId', "==", pet.id));
        
    //     petsBreedCollection.valueChanges({ idField: 'id' })
    //       .pipe(
    //         map((breeds) => breeds.sort(this.sortByName))
    //       )
    //       .subscribe((breeds) => {
    //         convertedPet.breeds = breeds;
    //         convertedPet.total = breeds.reduce((sum, breed) => sum + breed.counter, 0);
    //       });
        
    //     return convertedPet;
    //   }).sort(this.sortByName))
    // );
  }

  public getPets(): Observable<Array<Pet>> {
    return this.petsCollection.get().pipe(
      map((pets) => pets.docs.map((pet) => {
        const convertedPet = pet.data();
        convertedPet.id = pet.id;

        const petsBreedCollection = this.afs.collection<Breed>('breeds', ref => ref.where('petId', "==", pet.id));
        
        petsBreedCollection.valueChanges({ idField: 'id' })
          .pipe(
            map((breeds) => breeds.sort(this.sortByName))
          )
          .subscribe((breeds) => {
            convertedPet.breeds = breeds;
          });
        
        return convertedPet;
      }).sort(this.sortByName))
    );
  }

  public getBreeds(): Observable<Array<Breed>> {
    return this.breedsCollection.get().pipe(
      map((breed) => breed.docs.map((breed) => {
        const convertedBreed = breed.data();
        convertedBreed.id = breed.id;
        return convertedBreed;
      }))
    );
  }

  public async addRecord(record: Record, date: string) {
    await this.afs.collection('records').doc(date).set(record);

    // records: {picture, time, place, breeds, userId}
    // user: breeds: {breedId: number}
  }

  public createBreed() {
    //Creating a breed in admin mode (COMING SOON)
  }
}
