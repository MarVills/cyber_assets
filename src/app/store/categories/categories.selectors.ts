import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../state/categories.state';

export const selectCategoriesFeatureState =
  createFeatureSelector<any>('categories');
export const selectCategory = createSelector(
  selectCategoriesFeatureState,
  (state: CategoriesState) => state
);
