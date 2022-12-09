import { Action, createReducer, on } from '@ngrx/store';
import { ActivityLogsState } from '../state/activity-log.state';
import * as activityLogsAction from './activity-log.actions';

export const activityLogFeatureKey = 'activityLog';

export const initialState: ActivityLogsState = {
  activityLogs: [],
};

export const activityLogReducer = createReducer(
  initialState,
  on(
    activityLogsAction.successFetchActivityLogsACTION,
    (state: ActivityLogsState, { payload }) => {
      return {
        ...state,
        activityLogs: payload,
      };
    }
  ),

  on(
    activityLogsAction.successAddActivityLogACTION,
    (state: ActivityLogsState, { payload: any }) => {
      return { ...state };
    }
  )
);
