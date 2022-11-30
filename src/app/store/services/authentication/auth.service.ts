import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AccountDetails, AllData } from 'src/app/Models/manage-account.model';
import { map } from 'rxjs/operators';
import { UserDetail } from 'src/app/Models/user-details.model';
import { User } from 'src/app/shared/user-details/user-details';
import { Store } from '@ngrx/store';
import * as userDetailActions from '../../../store/user-details/user-details.actions';
import { ManageAccountService } from '../manage-account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<any>;
  loggedIn = new BehaviorSubject<boolean>(false);
  authState = false; 

  constructor(
    private angularFireAuth: AngularFireAuth,
    private sharedService: SharedService,
    private fireStore: AngularFirestore,
    private user: User,
    private store: Store,
    private manageAccount: ManageAccountService) {
    this.userData = angularFireAuth.authState;
   }

   signUp(allData: AllData) {
    this.angularFireAuth
    .createUserWithEmailAndPassword(allData.emailAddress, allData.password)
    .then(response => {
      const userDetails:AccountDetails = {
        firstName: allData.firstName,
        lastName: allData.lastName,
        middleName: allData.middleName,
        userRole: allData.userRole,
        emailAddress: allData.emailAddress,
        contactNumber: allData.contactNumber,
        description: allData.description,
        uid: response.user!.uid,
        profileImageID: allData.profileimage!
      }
      this.user.signedInUserDetails = userDetails;
      this.sharedService.openSnackBar("Registered Successfully");
      this.fireStore.collection('users').add(userDetails)
    })
    .catch(response => {
      console.log("Error",response)
      this.sharedService.openSnackBar(response.message)
    });    
 }

  async signIn(email: string, password: string) {
    let isSignedIn = false; 
    await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!', res);
        isSignedIn = true;
        // To remove saving user id to local storage, pending task
        localStorage.setItem("uid", (res.user!.uid).toString()); 
        // This.store.dispatch(userDetailActions.requestFetchUserDetailsACTION({payload: []}))
        this.user.signedInUserId = {userID: res.user!.uid}
        this.manageAccount.onFetchAccDetails();
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
        this.sharedService.openSnackBar(err.message);
      });
    return isSignedIn;
  }

  getAuth(){
    return this.angularFireAuth;
  }

  async isLoggedIn():Promise<boolean>{
   await this.angularFireAuth.onAuthStateChanged((user) => {
      this.authState = user?true:false
      console.log("Auth State: ", this.authState);
    })
    return this.authState
    
  }

  signOut(){
    this.angularFireAuth
    .signOut();
    localStorage.removeItem("uid");
    location.reload();
  }
}
