import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import * as activityLogActions from '../activity-log/activity-log.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { ActivityLogService } from './activity-log.service';

@Injectable()
export class ActivityLogEffects {
  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
    private logService: ActivityLogService,
  ) {}

  fetchActivityLogsEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(activityLogActions.requestFetchActivityLogsACTION),
      switchMap(() => {
        return this.logService.fetchActivityLogs().pipe(
          switchMap((response:any)=>{
             return [ activityLogActions.successFetchActivityLogsACTION({ payload: response }) ];
          }),
           catchError((error: Error) => {
              console.log('Fetch Error: ', error);
              return of(
                activityLogActions.onActivityLogFailure({ error: error })
              );
            })
        )
      })
    )
  );

  addActivityLogEFFECT$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(activityLogActions.requestAddActivityLogACTION),
      switchMap((response) => {
        return this.logService.addActivityLog(response.payload).pipe(
          switchMap((response)=>{
             return [activityLogActions.successAddActivityLogACTION(response)];
          }),
           catchError((error) => {
            console.log('Add Error: ', error);
            this.sharedService.openSnackBar("Failed to update activity log")
            return [activityLogActions.onActivityLogFailure({ error: error })];
          }),
        )
      })
    );
  });
}





