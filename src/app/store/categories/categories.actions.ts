import { createAction, props } from '@ngrx/store';
import { Category, CategoryDTO } from 'src/app/Models/category.model';

export const requestFetchCategoriesACTION = createAction(
  '[Categories] Request Fetch Categories'
);
export const successFetchCategoriesACTION = createAction(
  '[Categories] Success Fetch Categories',
  props<{ payload: any[] }>()
);
export const requestFetchCategoryACTION = createAction(
  '[ Categories ] Request Fetch Category',
  props<{ payload: number }>()
);
export const successFetchCategoryACTION = createAction(
  '[ Categories ] Success Fetch Category',
  props<{ payload: CategoryDTO }>()
);
export const requestAddCategoryACTION = createAction(
  '[ Categories ] Request Add Category',
  props<{ payload: Category }>()
);
export const successAddCategoryACTION = createAction(
  '[ Categories ] Success Add Category'
);
export const requestDeleteCategoryACTION = createAction(
  '[ Categories ] Request Delete Category',
  props<{ id: number }>()
);
export const successDeleteCategoryACTION = createAction(
  '[ Categories ] Success Delete Category'
);
export const requestUpdateCategoryACTION = createAction(
  '[Categories] Request Update Category',
  props<{ id: number; payload: Category }>()
);
export const successUpdateCategoryACTION = createAction(
  '[ Categories ] Success Update Category'
);
export const onCategoryFailure = createAction(
  '[ Categories ] Categories Failure',
  props<{ error: any }>()
);
