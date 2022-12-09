import { createAction, props } from '@ngrx/store';
import { UserDetail, UserDetailDTO } from 'src/app/Models/user-details.model';

export const requestFetchUserDetailsACTION = createAction(
  '[ UserDetails ] Request Fetch UserDetails'
);
export const successFetchUserDetailsACTION = createAction(
  '[ UserDetails ] Success Fetch UserDetails',
  props<{ payload: any[] }>()
);
// export const requestFetchUserDetailACTION = createAction(
//   '[ UserDetails ] Request Fetch UserDetail',
//   props<{ uid: string }>()
// );
// export const successFetchUserDetailACTION = createAction(
//   '[ UserDetails ] Success Fetch UserDetail',
//   props<{ payload: UserDetailDTO }>()
// );
export const requestAddUserDetailACTION = createAction(
  '[ UserDetails ] Request Add UserDetail',
  props<{ payload: UserDetail }>()
);
export const successAddUserDetailACTION = createAction(
  '[ UserDetails ] Success Add UserDetail'
);
export const requestDeleteUserDetailACTION = createAction(
  '[ UserDetails ] Request Delete UserDetail',
  props<{ payload: string }>()
);
export const successDeleteUserDetailACTION = createAction(
  '[ UserDetails ] Success Delete UserDetail'
);
export const requestUpdateUserDetailACTION = createAction(
  '[ UserDetails ] Request Update UserDetail',
  props<{ id: string; payload: UserDetail }>()
);
export const successUpdateUserDetailACTION = createAction(
  '[ UserDetails ] Success Update UserDetail'
);
export const onUserDetailFailure = createAction(
  '[ UserDetails ] UserDetails Failure',
  props<{ error: any }>()
);
