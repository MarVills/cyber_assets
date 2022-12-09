import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import {
  AccountCredentials,
  AccountDetails,
  AllData,
} from 'src/app/Models/manage-account.model';
import { map, take, takeWhile } from 'rxjs/operators';
import { UserDetail } from 'src/app/Models/user-details.model';
import { User } from 'src/app/shared/user-details/user-details';
import { Store } from '@ngrx/store';
import * as userDetailActions from '../../user-details/user-details.actions';
import { ManageAccountService } from '../manage-account.service';
import * as authActions from '../../auth/auth.actions';
import * as authState from '../../state/auth.state';
import { isSignedIn } from '../../auth/auth.selectors';
import { AuthState } from '../../state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Observable<any>;
  initialValue: AuthState = { uid: '', signedIn: false };
  loggedIn = new BehaviorSubject<AuthState>(this.initialValue);
  authState = false;
  loginState$!: Subscription;
  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private sharedService: SharedService,
    private fireStore: AngularFirestore,
    private user: User,
    private store: Store,
    private manageAccount: ManageAccountService
  ) {
    this.userData = angularFireAuth.authState;
  }

  signUp(allData: AllData) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(allData.emailAddress, allData.password)
      .then((response) => {
        const userDetails: AccountDetails = {
          firstName: allData.firstName,
          lastName: allData.lastName,
          middleName: allData.middleName,
          userRole: allData.userRole,
          emailAddress: allData.emailAddress,
          contactNumber: allData.contactNumber,
          description: allData.description,
          uid: response.user!.uid,
          profileImageID: allData.profileimage!,
        };
        this.user.signedInUserDetails = userDetails;
        this.sharedService.openSnackBar('Registered Successfully');
        this.fireStore.collection('users').add(userDetails);
      })
      .catch((response) => {
        console.log('Error', response);
        this.sharedService.openSnackBar(response.message);
      });
  }

  signIn(email: string, password: string) {
    const credentials: AccountCredentials = {
      email: email,
      password: password,
    };
    this.store.dispatch(authActions.requestAuthLogin({ payload: credentials }));
  }

  getAuth() {
    return this.angularFireAuth;
  }

  async isLoggedIn(): Promise<boolean> {
    await this.angularFireAuth.onAuthStateChanged((user) => {
      this.authState = user ? true : false;
    });
    return this.authState;
  }

  signOut() {
    // this.angularFireAuth
    // .signOut();
    // localStorage.removeItem("uid");
    // location.reload();
    this.store.dispatch(authActions.requestAuthLogout());
  }
}
