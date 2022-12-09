import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import * as activityLogActions from '../activity-log/activity-log.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { ActivityLog } from 'src/app/Models/activity-log-model';

@Injectable()
export class ActivityLogEffects {
  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService
  ) {}

  fetchActivityLogsEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(activityLogActions.requestFetchActivityLogsACTION),
      switchMap(() => {
        return this.fireStore
          .collection('activity_logs')
          .valueChanges({ idField: 'id' })
          .pipe(
            switchMap((response) => {
              return [
                activityLogActions.successFetchActivityLogsACTION({
                  payload: response,
                }),
              ];
            }),
            catchError((error: Error) => {
              console.log('Fetch Error: ', error);
              return of(
                activityLogActions.onActivityLogFailure({ error: error })
              );
            })
          );
      })
    )
  );

  addActivityLogEFFECT$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(activityLogActions.requestAddActivityLogACTION),
      switchMap((resposne) => {
        return this.fireStore
          .collection('activity_logs')
          .add(resposne.payload)
          .then(() => {
            return activityLogActions.successAddActivityLogACTION(resposne);
          })
          .catch((error) => {
            console.log('Add Error: ', error);
            return activityLogActions.onActivityLogFailure({ error: error });
          });
      })
    );
  });
}
