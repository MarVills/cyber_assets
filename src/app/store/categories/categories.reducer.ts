import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesState } from '../state/categories.state';
import * as categoriesAction from '../categories/categories.actions';

export const categoriesFeatureKey = 'categories';

export const initialState: CategoriesState = {
  categories: [],
};

export const categoryReducer = createReducer(
  initialState,

  on(
    categoriesAction.successFetchCategoriesACTION,
    (state: CategoriesState, { payload }) => {
      return {
        ...state,
        categories: payload,
      };
    }
  ),

  on(categoriesAction.successAddCategoryACTION, (state: CategoriesState) => {
    return { ...state, state };
  }),

  on(
    categoriesAction.requestUpdateCategoryACTION,
    (state: CategoriesState, { payload }) => {
      const updateCategory = [state.categories].map((category: any) => {
        return payload === category.id ? payload : category;
      });
      const returnState = { ...state, category: updateCategory };
      return returnState;
    }
  ),

  on(
    categoriesAction.requestDeleteCategoryACTION,
    (state: CategoriesState, { id }) => {
      let newCategories = [state.categories];
      newCategories.splice(newCategories.indexOf(id), 1);
      const returnState = { ...state, products: newCategories };
      return returnState;
    }
  )
);
