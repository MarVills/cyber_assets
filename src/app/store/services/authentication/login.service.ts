import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) { 
    this.userData = angularFireAuth.authState;
  }

 async signIn(email: string, password: string) {
    var isSignedIn = false; 
    console.log("userdata",this.userData);
    await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!', res);
        isSignedIn = true;
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
    return isSignedIn;
  }
}
