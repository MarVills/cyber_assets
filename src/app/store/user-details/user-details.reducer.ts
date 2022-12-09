import { Action, createReducer, on } from '@ngrx/store';
import { UserDetailState } from '../state/user-details.state';
import * as userDetailActions from './user-details.actions';

export const userDetailsFeatureKey = 'userDetails';

export const initialState: UserDetailState = {
  users: [],
};

export const usersReducer = createReducer(
  initialState,
  on(
    userDetailActions.successFetchUserDetailsACTION,
    (state: UserDetailState, { payload }) => {
      return {
        ...state,
        users: payload,
      };
    }
  ),

  on(userDetailActions.successAddUserDetailACTION, (state: UserDetailState) => {
    return { ...state };
  }),

  on(
    userDetailActions.requestUpdateUserDetailACTION,
    (state: UserDetailState, { payload }) => {
      const updateProduct = [state.users].map((users: any) => {
        return payload === users.id ? payload : users;
      });
      const returnState = {
        ...state,
        detials: updateProduct,
      };
      return returnState;
    }
  ),

  on(
    userDetailActions.requestDeleteUserDetailACTION,
    (state: UserDetailState, { payload }) => {
      let newState = [state.users];
      newState.splice(newState.indexOf(payload), 1);
      const returnState = { ...state, detials: newState };
      return returnState;
    }
  )
);
