import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AllData, } from '../../state/accounts/manage-account.state';
import { AccountDetails } from '../../state/accounts/manage-account.state';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // acountDetails$ = this.getObservable(this.fireStore.collection('users')) as Observable<AccountDetails[]>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private sharedService: SharedService,
    private fireStore: AngularFirestore
    ) { }

  // getObservable(collection: AngularFirestoreCollection<AccountDetails>){
  //   const subject = new BehaviorSubject<any[]>([]);
  //   collection.valueChanges({ idField: 'id' }).subscribe((val: any[]) => {
  //     subject.next(val);
  //   });
  //   return subject;
  // };
  
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
        "uid": response.user.uid
      })
    })
    .catch(response => {
      console.log("Error",response)
      this.sharedService.openSnackBar(response.message)
    });    
 }
}
