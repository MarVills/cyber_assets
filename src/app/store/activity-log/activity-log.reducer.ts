import { Action, createReducer, on } from '@ngrx/store';
import { ActivityLogsState } from '../state/activity-log.state';
import * as activityLogsAction from './activity-log.actions';


export const activityLogFeatureKey = 'activityLog';


export const initialState: ActivityLogsState = {
  activityLogs: [],
};


export const reducer = createReducer(
  initialState,
  on(activityLogsAction.successFetchActivityLogsACTION, (state: ActivityLogsState, { payload }) =>{
    return { 
      ...state, 
      activityLogs: payload }
  }),

  on(activityLogsAction.successAddActivityLogACTION, (state: ActivityLogsState) =>{
    return { ...state }
  }),

  on(activityLogsAction.requestUpdateActivityLogACTION, (state: ActivityLogsState, { payload }) =>{
    const updateProduct = [state.activityLogs].map((product:any)=> {
      return payload === product.id ? payload : product;
    })
    const returnState = { ...state, products: updateProduct, selected_product: '' }
    return returnState;
  }),

  on(activityLogsAction.requestDeleteActivityLogACTION, (state: ActivityLogsState, { payload }) =>{
    let newState = [state.activityLogs];
    newState.splice(newState.indexOf(payload), 1);
    const returnState = { ...state, products: newState }
    return returnState;
  }),

);

