import { createAction, props } from '@ngrx/store';
import { ActivityLog, ActivityLogDTO } from 'src/app/Models/activity-log-model';

export const requestFetchActivityLogsACTION = createAction(
  '[ ActivityLogs ] Request Fetch ActivityLogs'
);
export const successFetchActivityLogsACTION = createAction(
  '[ ActivityLogs ] Success Fetch ActivityLogs',
  props<{ payload: any[] }>()
);
export const requestFetchActivityLogACTION = createAction(
  '[ ActivityLogs ] Request Fetch ActivityLog',
  props<{ payload: number }>()
);
export const successFetchActivityLogACTION = createAction(
  '[ ActivityLogs ] Success Fetch ActivityLog',
  props<{ payload: ActivityLogDTO }>()
);
export const requestAddActivityLogACTION = createAction(
  '[ ActivityLogs ] Request Add ActivityLog',
  props<{ payload: ActivityLog }>()
);
export const successAddActivityLogACTION = createAction(
  '[ ActivityLogs ] Success Add ActivityLog',
  props<{ payload: ActivityLog }>()
);
export const onActivityLogFailure = createAction(
  '[ ActivityLogs ] ActivityLogs Failure',
  props<{ error: any }>()
);
