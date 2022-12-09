import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ActivityLog } from '../Models/activity-log-model';
import { selectActivityLog } from '../store/activity-log/activity-log.selectors';
import * as activityLogActions from '../store/activity-log/activity-log.actions';

@Injectable({
  providedIn: 'root',
})
export class ActivityLogResolverService implements Resolve<ActivityLog[]> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ActivityLog[]> {
    return this.store.select(selectActivityLog).pipe(
      first(),
      switchMap((response) => {
        if (response.activityLogs.length == 0) {
          this.store.dispatch(
            activityLogActions.requestFetchActivityLogsACTION()
          );
        }
        return of(response.activityLogs);
      })
    );
  }
}
