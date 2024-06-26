import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pet } from 'src/interfaces/pet';
import { filter, map, switchMap } from 'rxjs/operators';
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

  private sortByCounter(a: any, b:any) {
    if (a.counter > b.counter)
      return -1;
    if (a.counter < b.counter)
      return 1;
    return 0;
  };

  public getUserPets(): Observable<any> {
    this.recordsCollection = this.afs.collection<Record>('records', ref => ref.where('userId', "==", this.authService.user?.uid));
    let userBreeds: any = {};

    return this.getPets().pipe(
      switchMap((pets: Pet[]) => {
        return this.recordsCollection.get().pipe(
          map((records) => {
            records.docs.forEach((record) => {
              const recordBreeds = record.data().breeds;

              Object.keys(recordBreeds).forEach((breedId) => {
                if ((Object.keys(userBreeds)).includes(breedId)) {
                  userBreeds[breedId] += recordBreeds[breedId];
                } else {
                  userBreeds[breedId] = recordBreeds[breedId];
                }
              });
            });

            pets.forEach((pet) => {
              pet.breeds.forEach((breed: Breed) => {
                if (breed.counter) delete (breed.counter);
                if (userBreeds[breed.id]) breed.counter = userBreeds[breed.id];
              });
              pet.ownedBreeds = pet.breeds.filter(breed => breed.counter).sort(this.sortByCounter);
              pet.total = pet.breeds.reduce((sum, breed) => breed.counter ? (sum + breed.counter) : sum, 0);
            });

            return pets;
          })
        );
      })
    );
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

  public getBreedRecords(breedId: string): Observable<Record[]> {
    return this.recordsCollection.get().pipe(
      map((records) => {
        const filteredRecords = records.docs.filter((record) => Object.keys(record.data().breeds).includes(breedId));
        filteredRecords.reverse();
        return filteredRecords.map((record) => {
          const convertedRecord = record.data();
          delete(convertedRecord.userId);

          const date = record.id.slice(0, 10).replace(/-/g, '/');
          const hour = parseInt(record.id.slice(11,13));
          const time = hour === 23 ? ('00' + record.id.slice(13, 19)) : ((hour + 1).toString() + record.id.slice(13, 19));

          convertedRecord.date = date;
          convertedRecord.time = time;
          convertedRecord.datetime = date + ' ' + time;
          return convertedRecord;
        });
      })
    );
  }

  public async addRecord(record: Record, date: string) {
    await this.afs.collection('records').doc(date).set(record);
  }

  public createBreed() {
    //Creating a breed in admin mode (COMING SOON)
  }
}
