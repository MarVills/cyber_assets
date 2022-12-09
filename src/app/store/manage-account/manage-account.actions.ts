import { createAction, props } from '@ngrx/store';

export const requestAuthRegister = createAction(
  '[Auth] Request Auth Register ',
  props<{ payload: any }>()
);
export const successAuthRegister = createAction(
  '[Auth] Success Auth Register ',
  props<{ payload: any }>()
);
