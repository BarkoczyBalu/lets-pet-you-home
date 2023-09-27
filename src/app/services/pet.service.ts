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
    return this.petsCollection.get().pipe(
      map((pets) => pets.docs.map((pet) => {
        const convertedPet = pet.data();
        convertedPet.id = pet.id;

        const petsBreedCollection = this.afs.collection<Breed>('breeds', ref => ref.where('petId', "==", pet.id));
        
        petsBreedCollection.valueChanges()
          .subscribe((breeds) => {
            convertedPet.breeds = breeds;
            convertedPet.total = breeds.reduce((sum, breed) => sum + breed.counter, 0);
          });
          ;
        
        return convertedPet;
      }))
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
    console.log(selectedBreeds);
    selectedBreeds.forEach(async (breed) => {
      breed.counter++;
      await this.afs.doc('breeds/' + breed.id).update(breed);
    });
  }

  public createBreed() {
    
  }
}
