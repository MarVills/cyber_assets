import { Action, createReducer, on } from '@ngrx/store';
import { UserDetailState } from '../state/user-details.state';
import * as userDetailActions from './user-details.actions';


export const userDetailsFeatureKey = 'userDetails';

export const initialState: UserDetailState = {
  details: []
};


export const reducer = createReducer(
  initialState,
  on(userDetailActions.successFetchUserDetailsACTION, (state: UserDetailState, { payload }) =>{
    return { 
      ...state, 
      equipments: payload }
  }),

  on(userDetailActions.successAddUserDetailACTION, (state: UserDetailState) =>{
    return { ...state }
  }),

  on(userDetailActions.requestUpdateUserDetailACTION, (state: UserDetailState, { payload }) =>{
    const updateProduct = [state.details].map((product:any)=> {
      return payload === product.id ? payload : product;
    })
    const returnState = { ...state, products: updateProduct, selected_product: '' }
    return returnState;
  }),

  on(userDetailActions.requestDeleteUserDetailACTION, (state: UserDetailState, { payload }) =>{
    let newState = [state.details];
    newState.splice(newState.indexOf(payload), 1);
    const returnState = { ...state, products: newState }
    return returnState;
  }),

);

