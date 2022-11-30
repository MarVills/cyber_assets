import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { catchError, switchMap } from 'rxjs/operators';
import * as userDetailActions from './user-details.actions';


@Injectable()
export class UserDetailsEffects {

  constructor(private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService) {}

  fetchUserDetailsEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userDetailActions.requestFetchUserDetailsACTION),
    switchMap(()=>{
      return this.fireStore.collection('users').valueChanges({ idField: 'id' }).pipe(
        switchMap((response)=>{
          return [userDetailActions.successFetchUserDetailsACTION({ payload: response })]
        }),
        catchError((error: Error) => {
         console.log("Fetch Error: ", error)
         return of(userDetailActions.onUserDetailFailure({ error: error }))
        })
      )
    })
  ));

  // ======================================= workign on fetch one with firebase ngrx =======================
  // fetchSingleUserDetailEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //   ofType(userDetailActions.requestFetchUserDetailACTION),
  //   switchMap(()=>{
  //     return this.fireStore.collection('users').valueChanges({ idField: 'id' }).pipe(
  //       switchMap((response)=>{
  //         response.filter((response)=> response)
  //         return [userDetailActions.successFetchUserDetailACTION({ uid: {userId:""} })]
  //       }),
  //       catchError((error: Error) => {
  //        console.log("Fetch Error: ", error)
  //        return of(userDetailActions.onUserDetailFailure({ error: error }))
  //       })
  //     )
  //   })
  // ));
  
  // ==============================================================
  
  addUserDetailEFFECT$: Observable<Action> = createEffect(() => { 
    return this.actions$.pipe(
      ofType(userDetailActions.requestAddUserDetailACTION),
      switchMap((data)=>{
        return this.fireStore.collection('users').add(data.payload).then(()=>{
          this.sharedService.openSnackBar("User details added successfuly", "Ok");
          return userDetailActions.successAddUserDetailACTION()
        }).catch((error)=>{
          console.log("Add Error: ", error)
          this.sharedService.openSnackBar("Failed adding user details", "Ok");
          return userDetailActions.onUserDetailFailure({ error: error })
        })
      })
    )}
  );

  updateUserDetailEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userDetailActions.requestUpdateUserDetailACTION),
    switchMap((data)=>{
      return this.fireStore.collection('users').doc(data.id).update(data.payload).then(()=>{
        this.sharedService.openSnackBar("User details updated successfuly", "Ok");
        return userDetailActions.successUpdateUserDetailACTION()
      }).catch((error)=>{
        console.log("Update Error: ", error)
        this.sharedService.openSnackBar("Failed updating user details", "Ok");
        return userDetailActions.onUserDetailFailure({ error: error })
      })
    })
  ));

  deleteUserDetailEFFEET$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(userDetailActions.requestDeleteUserDetailACTION),
    switchMap((docID)=>{
      return this.fireStore.collection('users').doc(docID.payload).delete().then(()=>{
        this.sharedService.openSnackBar("Equipment deleted successfuly", "Ok");
        return userDetailActions.successAddUserDetailACTION()
      }).catch((error)=>{
        console.log("Delete Error: ", error)
        this.sharedService.openSnackBar("Failed deleting equipment", "Ok");
        return userDetailActions.onUserDetailFailure({ error: error })
      })
    })
  ));

}
