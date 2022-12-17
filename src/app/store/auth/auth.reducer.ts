import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  signedIn: false,
  uid: '',
  userData: {}
};

export const authReducer = createReducer(
  initialState,
  on(authActions.successAuthLogin, (state: any, { payload }) => {
    return { ...state.uid, uid: payload.uid };
  }),

  on(authActions.successAuthLogout, (state: any) => {
    return {...state.uid, uid: '' };
  }),
   on(authActions.successFetchUserData, (state: any, { payload }) => {
    return { ...state.userData, userData: payload };
  }),
);