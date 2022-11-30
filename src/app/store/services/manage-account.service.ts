import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AccountDetails, ACCOUNT_DETAILS_DATA } from 'src/app/Models/manage-account.model';
import { User } from '../../shared/user-details/user-details';


@Injectable({
  providedIn: 'root'
})
export class ManageAccountService implements OnDestroy{

  accountDetails$!: Subscription;
  userAccountDetails!:AccountDetails;
  observable$ = this.getObservable(this.fireStore.collection('users')) as Observable<AccountDetails[]>;

  constructor(
    private fireStore: AngularFirestore,
    private user: User) { }

  ngOnDestroy(): void {
    this.accountDetails$.unsubscribe();
  }

  getObservable(collection: AngularFirestoreCollection<AccountDetails>){
    const subject = new BehaviorSubject<AccountDetails[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: AccountDetails[]) => {
      subject.next(val);
    });
    return subject;
  }; 
  
 onFetchAccDetails(){
   // Temporarily using this function while working on 
   // fetch one data function in firebase with ngrx.
    this.observable$.subscribe((response) => {
      ACCOUNT_DETAILS_DATA.splice(0)
      for (var res of response) {
        if(res.uid == localStorage.getItem('uid')){
          localStorage.setItem("userDocID", res.id!)
          accData = {
            firstName: res.firstName ,
            lastName: res.lastName,
            middleName: res.middleName,
            userRole: res.userRole,
            emailAddress: res.emailAddress,
            description: res.description,
            profileImageID: res.profileImageID,
            contactNumber: res.contactNumber,
            uid: localStorage.getItem('uid')!
          }
          this.user.signedInUserDetails = accData
        }
      }
    })
  } 

  fetchAccounts(){
    this.observable$.subscribe((response) => {
      ACCOUNT_DETAILS_DATA.splice(0)
      for (var res of response) {
        ACCOUNT_DETAILS_DATA.push(res);
      }
    })
  }

  onEditAccountDetails(currentData:any, newData: any){
    ACCOUNT_DETAILS_DATA[ACCOUNT_DETAILS_DATA.indexOf({
      firstName: currentData.firstName,
      lastName: currentData.lastName,
      middleName: currentData.middleName,
      emailAddress: currentData.emailAddress,
      contactNumber: currentData.contactNumber,
      profileImageID: currentData.downloadUrl,
      description: currentData.description
    })] = newData;
    return this.fireStore.collection('users').doc(localStorage.getItem('userDocID')!).update(newData);
  }
}

export let accData: AccountDetails = {
  firstName: '' ,
  profileImageID:'',
  lastName: '',
  middleName: '',
  userRole: '',
  emailAddress: '',
  description: '',
  contactNumber: '',
  uid: ''
}
