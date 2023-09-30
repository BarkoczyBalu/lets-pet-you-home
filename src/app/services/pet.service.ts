import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pet } from 'src/interfaces/pet';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breed } from 'src/interfaces/breed';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsCollection = this.afs.collection<Pet>('pets');
  private breedCollection = this.afs.collection<Breed>('breeds');

  public viewState: 'pet' | 'breed' = 'pet';

  constructor(private afs: AngularFirestore) { }

  public getPets(): Observable<Array<Pet>> {
    const compareFn = (a: any, b:any) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    };

    return this.petsCollection.get().pipe(
      map((pets) => pets.docs.map((pet) => {
        const convertedPet = pet.data();
        convertedPet.id = pet.id;

        const petsBreedCollection = this.afs.collection<Breed>('breeds', ref => ref.where('petId', "==", pet.id));
        
        petsBreedCollection.valueChanges()
          .pipe(
            map((breeds) => breeds.map((breed) => {
              breed.addCounter = 0;
              return breed;
            }).sort(compareFn))
          )
          .subscribe((breeds) => {
            convertedPet.breeds = breeds;
            convertedPet.total = breeds.reduce((sum, breed) => sum + breed.counter, 0);
          });
          ;
        
        return convertedPet;
      }).sort(compareFn))
    );
  }

  public getBreeds(): Observable<Array<Breed>> {
    return this.breedCollection.get().pipe(
      map((breed) => breed.docs.map((breed) => {
        const convertedBreed = breed.data();
        convertedBreed.id = breed.id;
        return convertedBreed;
      }))
    );
  }

  public addBreed(selectedBreeds: Array<Breed>) {
    selectedBreeds.forEach(async (breed) => {
      breed.counter += breed.addCounter!;
      delete(breed.addCounter);
      await this.afs.doc('breeds/' + breed.id).update(breed);
    });
  }

  public createBreed() {
    
  }
}
