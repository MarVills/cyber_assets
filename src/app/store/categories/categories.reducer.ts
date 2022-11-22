import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesState } from '../state/categories.state';
import * as categoriesAction from '../categories/categories.actions';


export const categoriesFeatureKey = 'categories';


export const initialState: CategoriesState = {
  categories: [],
};


export const categoryReducer = createReducer(
  initialState,

  on(categoriesAction.successFetchCategoriesACTION, (state: CategoriesState, { payload }) =>{
    return { 
      ...state, 
      equipments: payload }
  }),

  on(categoriesAction.successAddCategoryACTION, (state: CategoriesState) =>{
    return { ...state }
  }),

  on(categoriesAction.requestUpdateCategoryACTION, (state: CategoriesState, { payload }) =>{
    const updateProduct = [state.categories].map((product:any)=> {
      return payload === product.id ? payload : product;
    })
    const returnState = { ...state, products: updateProduct, selected_product: '' }
    return returnState;
  }),

  on(categoriesAction.requestDeleteCategoryACTION, (state: CategoriesState, { payload }) =>{
    let newState = [state.categories];
    newState.splice(newState.indexOf(payload), 1);
    const returnState = { ...state, products: newState }
    return returnState;
  }),
);

