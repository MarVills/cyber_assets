import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ACTIVITY_LOG_DATA } from 'src/app/Models/activity-log-model';
import * as logActions from '../activity-log/activity-log.actions'
import { selectActivityLog } from '../activity-log/activity-log.selectors';


@Injectable({
  providedIn: 'root'
})
export class ActivityLogService implements OnDestroy{

  fetchActivityLogs$!: Subscription;

  constructor(private store: Store) { }
  ngOnDestroy(): void {
   this.fetchActivityLogs$.unsubscribe();
  }

  onFetchActivityLogs(){
    this.store.dispatch(logActions.requestFetchActivityLogsACTION({payload: []}));
    this.fetchActivityLogs$ = this.store.select( selectActivityLog ).subscribe((response) => {
        ACTIVITY_LOG_DATA.splice(0)
        for (var res of response.activityLogs) {
          ACTIVITY_LOG_DATA.push(res);
        }
    })
  }
}
