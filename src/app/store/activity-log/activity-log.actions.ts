import { createAction, props } from '@ngrx/store';
import { ActivityLog, ActivityLogDTO } from 'src/app/Models/activity-log-model';


export const requestFetchActivityLogsACTION = createAction(
  '[ ActivityLogs ] Request Fetch ActivityLogs',
   props<{payload: any[] }>(),
);
export const successFetchActivityLogsACTION = createAction(
 '[ ActivityLogs ] Success Fetch ActivityLogs',
  props<{payload: any[] }>(),
);
export const requestFetchActivityLogACTION = createAction(
  '[ ActivityLogs ] Request Fetch ActivityLog',
  props<{payload: number }>()
);
export const successFetchActivityLogACTION = createAction(
  '[ ActivityLogs ] Success Fetch ActivityLog',
  props<{payload: ActivityLogDTO }>()
);
export const requestAddActivityLogACTION = createAction(
  '[ ActivityLogs ] Request Add ActivityLog',
  props<{payload: ActivityLog}>()
);
export const successAddActivityLogACTION = createAction(
  '[ ActivityLogs ] Success Add ActivityLog',
);
export const requestDeleteActivityLogACTION = createAction(
  '[ ActivityLogs ] Request Delete ActivityLog',
  props<{payload: string}>()
);
export const successDeleteActivityLogACTION = createAction(
  '[ ActivityLogs ] Success Delete ActivityLog',
);
export const requestUpdateActivityLogACTION = createAction(
  '[ ActivityLogs ] Request Update ActivityLog',
  props<{ id: string, payload: ActivityLog }>()
);
export const successUpdateActivityLogACTION = createAction(
  '[ ActivityLogs ] Success Update ActivityLog',
);
export const onActivityLogFailure = createAction(
  '[ ActivityLogs ] ActivityLogs Failure',
  props<{ error: any }>()
);
