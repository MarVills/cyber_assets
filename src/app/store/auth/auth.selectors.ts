import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../state/auth.state';

export const selectEquipmentsFeatureState = createFeatureSelector<any>('auth');
export const selectAuthState = (state: any) => state.auth;

export const isSignedIn = createSelector(
  selectAuthState,
  (state: any) => state
);
export const isLoggedOut = createSelector(isSignedIn, (signedIn) => !signedIn);
export const selectUserData = createSelector(
  selectEquipmentsFeatureState,
  (state: any) => state
);

