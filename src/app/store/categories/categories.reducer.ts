import { createReducer, on } from '@ngrx/store';
import { CategoriesState } from '../state/categories.state';
import * as categoriesAction from '../categories/categories.actions';
import { Category } from 'src/app/Models/category.model';


export const categoriesFeatureKey = 'categories';

export const initialState: CategoriesState = {
  categories: [],
  selectedCategory: <Category>{}
};

export const categoryReducer = createReducer(
  initialState,

  on(
    categoriesAction.successFetchCategoriesACTION,
    (state: CategoriesState, { payload }) => {
      return { ...state, categories: payload };
    }
  ),

  on(categoriesAction.successSelectCategoryACTION,
    (state: any, {payload}) =>{
      return { ...state, selectedCategory: payload };
    }),

  on(categoriesAction.successAddCategoryACTION, 
    (state: CategoriesState, { payload }) => {
      const categories = [...state.categories, payload]
    return { ...state, categories: categories };
  }),

  on(
    categoriesAction.requestUpdateCategoryACTION,
    (state: CategoriesState, { payload }) => {
      const updateCategory = [state.categories].map((category: any) => {
        return payload === category.id ? payload : category;
      });
     return { ...state, category: updateCategory }; 
    }
  ),

  on(
    categoriesAction.requestDeleteCategoryACTION,
    (state: CategoriesState, { id }) => {
      const categoryState = state;
      const categories = categoryState.categories.filter((response: any)=> {
        return response.id !== id
      })
      return { ...state, categories: categories };
    }
  )
);
