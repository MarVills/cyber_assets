import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityLogsState } from '../state/activity-log.state';

export const selectActivityLogsFeatureState = createFeatureSelector<any>('activity_logs');
export const selectActivityLog = createSelector(
    selectActivityLogsFeatureState,
    (state: ActivityLogsState) => state
)