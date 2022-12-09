import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  signedIn: false,
  uid: '',
};

export const authReducer = createReducer(
  initialState,
  on(authActions.successAuthLogin, (state: any, { payload }) => {
    return { state, payload };
  }),

  on(authActions.successAuthLogout, (state: any) => {
    return {
      signedin: false,
      uid: '',
    };
  })
);
