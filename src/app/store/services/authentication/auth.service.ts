import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AllData } from 'src/app/Models/manage-account.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<any>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private sharedService: SharedService,
    private fireStore: AngularFirestore) {
    this.userData = angularFireAuth.authState;
   }

   signUp(allData: AllData) {
    console.log(allData)
    
    var returnValue = "";
    this.angularFireAuth
    .createUserWithEmailAndPassword(allData.emailAddress, allData.password)
    .then(response => {
      this.sharedService.openSnackBar("Registered Successfully");
      this.fireStore.collection('users').add({
        "firstName": allData.firstName,
        "lastName": allData.lastName,
        "middleName": allData.middleName,
        "userRole": allData.userRole,
        "emailAddress": allData.emailAddress,
        "contactNumber": allData.contactNumber,
        "description": allData.description,
        "uid": response.user!.uid
      })
    })
    .catch(response => {
      console.log("Error",response)
      this.sharedService.openSnackBar(response.message)
    });    
 }

  async signIn(email: string, password: string) {
    var isSignedIn = false; 
    await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!', res);
        isSignedIn = true;
        localStorage.setItem("uid", (res.user!.uid).toString());
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
        this.sharedService.openSnackBar(err.message)
      });
    return isSignedIn;
  }

  getAuth(){
    return this.angularFireAuth;
  }

  signOut(){
    this.angularFireAuth
    .signOut();
    localStorage.removeItem("uid");
    location.reload();
  }
}
