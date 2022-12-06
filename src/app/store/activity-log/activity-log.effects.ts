import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import * as activityLogActions from '../activity-log/activity-log.actions';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable()
export class ActivityLogEffects {
  constructor(private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService) {}

    fetchActivityLogsEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(activityLogActions.requestFetchActivityLogsACTION),
      switchMap(()=>{
        return this.fireStore.collection('activity_logs').valueChanges({ idField: 'id' }).pipe(
          switchMap((response)=>{
            return [activityLogActions.successFetchActivityLogsACTION({ payload: response })]
          }),
          catchError((error: Error) => {
           console.log("Fetch Error: ", error)
           return of(activityLogActions.onActivityLogFailure({ error: error }))
          })
        )
      })
    ));
  
    addCategoryEFFECT$: Observable<Action> = createEffect(() => { 
      return this.actions$.pipe(
        ofType(activityLogActions.requestAddActivityLogACTION),
        switchMap((data)=>{
          return this.fireStore.collection('activity_logs').add(data.payload).then(()=>{
            return activityLogActions.successAddActivityLogACTION()
          }).catch((error)=>{
            console.log("Add Error: ", error)
            this.sharedService.openSnackBar("Failed adding activityLog", "Ok");
            return activityLogActions.onActivityLogFailure({ error: error })
          })
        })
      )}
    );
  
    updateCategoryEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(activityLogActions.requestUpdateActivityLogACTION),
      switchMap((data)=>{
        return this.fireStore.collection('categories').doc(data.id).update(data.payload).then(()=>{
          return activityLogActions.successUpdateActivityLogACTION()
        }).catch((error)=>{
          console.log("Update Error: ", error)
          this.sharedService.openSnackBar("Failed updating activity log", "Ok");
          return activityLogActions.onActivityLogFailure({ error: error })
        })
      })
    ));
  
    deleteCategoryEFFEET$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(activityLogActions.requestDeleteActivityLogACTION),
      switchMap((docID)=>{
        return this.fireStore.collection('categories').doc(docID.payload).delete().then(()=>{
          this.sharedService.openSnackBar("Category deleted successfuly", "Ok");
          return activityLogActions.successAddActivityLogACTION()
        }).catch((error)=>{
          console.log("Delete Error: ", error)
          this.sharedService.openSnackBar("Failed deleting category", "Ok");
          return activityLogActions.onActivityLogFailure({ error: error })
        })
      })
    ));
  

}


