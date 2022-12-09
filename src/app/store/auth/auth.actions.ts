import { createAction, props } from '@ngrx/store';
import { AccountCredentials } from 'src/app/Models/manage-account.model';

export const requestAuthLogin = createAction(
  '[Auth] Request Auth Login ',
  props<{ payload: AccountCredentials }>()
);
export const successAuthLogin = createAction(
  '[Auth] Success Auth Login ',
  props<{ payload: any }>()
);

export const requestAuthLogout = createAction(
  '[Auth] Request Auth Logout '
  // props<{ payload: any }>()
);
export const successAuthLogout = createAction('[Auth] Success Auth Logout ');

export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<{ error: any }>()
);
