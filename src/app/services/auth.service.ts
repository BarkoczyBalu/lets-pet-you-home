import { Injectable } from '@angular/core';
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fireAuth: Auth = getAuth();
  private userCollection = this.afs.collection<any>('users');
  
  public isLoading = false;
  public user: User | null = null;

  constructor(
    private router: Router,
    private afs: AngularFirestore
  ) {}

  public checkLoggedInUser() {
    this.isLoading = true;

    onAuthStateChanged(this.fireAuth, (user) => {
      if (user) {
        this.user = user;
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['']);
      }

      this.isLoading = false;
    });
  }

  public async getUser(uid: string) {
    try {
      return this.userCollection.valueChanges({ idField: 'id' }).pipe(
        map(users => users.filter(user => user.id === uid))
      );
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  public async createUser(email: string, password: string): Promise<User | undefined> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.fireAuth, email, password);
      this.user = userCredential.user;
      this.router.navigate(['']);
      return this.user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  } 

  public async signInUser(email: string, password: string): Promise<User | undefined>  {
    try {
      return await signInWithEmailAndPassword(this.fireAuth, email, password).then((userCredential) => {
        this.user = userCredential.user;
        this.user.getIdToken(true);
        this.router.navigate(['home']);
        return this.user;
      });
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  public async signOutUser(): Promise<void> {
    try {
      await this.fireAuth.signOut();
      this.user = null;
      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
    }
  }
}
