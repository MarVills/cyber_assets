import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import * as categoryActions from '../categories/categories.actions';
import { CategoryService } from './category.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  fetchCategoriesEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.requestFetchCategoriesACTION),
      switchMap(() => {
        return this.categoryService.fetchCategories()
          .pipe(
            switchMap((response:any) => {
              return [
                categoryActions.successFetchCategoriesACTION({
                  payload: response,
                }),
              ];
            }),
            catchError((error: any) => {
              console.log('Fetch Error: ', error);
                 if (error.status == 401){
                this.router.navigate(['/authentication/login'])
              }
              return of(categoryActions.onCategoryFailure({ error: error }));
            })
          );
      })
    )
  );

  selectCaategoryEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.requestSelectCategoryACTION),
        switchMap((response:any) => {

          return [
            categoryActions.successSelectCategoryACTION(response),
          ];
        
        }),
        catchError((error: Error) => {
          console.log('Fetch Error: ', error);
          return of(categoryActions.onCategoryFailure({ error: error }));
        })
    )
  );

  addCategoryEFFECT$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(categoryActions.requestAddCategoryACTION),
      switchMap((data) => {
        return this.categoryService.addCategory(data.payload).pipe(
          switchMap((response)=>{
            this.sharedService.openSnackBar('Category added successfuly', 'Ok');
            return [categoryActions.successAddCategoryACTION({payload: response})];
          }),
          catchError((error) => {
            console.log('Add Error: ', error);
            this.sharedService.openSnackBar('Failed adding category', 'Ok');
            return [categoryActions.onCategoryFailure({ error: error })];
          }),
        )
      })
    );
  });

  updateCategoryEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.requestUpdateCategoryACTION),
      switchMap((data) => {

        return this.categoryService.updateCategory(data.payload, data.id).pipe(
          switchMap((response)=>{
             this.sharedService.openSnackBar(
              'Category updated successfuly',
              'Ok'
            );
            console.log("response", response)
            return [categoryActions.successUpdateCategoryACTION(response)];
          }),
          catchError((error) => {
            console.log('Update Error: ', error);
            this.sharedService.openSnackBar('Failed updating category', 'Ok');
            return [categoryActions.onCategoryFailure({ error: error })];
          }),
        )
      })
    )
  );

  deleteCategoryEFFEET$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.requestDeleteCategoryACTION),
      switchMap((payload) => {
        return this.categoryService.deleteCategory(payload.id).pipe(
          switchMap((response)=>{
            this.sharedService.openSnackBar(
              'Category deleted successfuly',
              'Ok'
            );
            return [categoryActions.successDeleteCategoryACTION()];
          }),
            catchError((error) => {
            console.log('Delete Error: ', error);
            this.sharedService.openSnackBar('Failed deleting category', 'Ok');
            return [categoryActions.onCategoryFailure({ error: error })];
          }),
        )
      })
    )
  );
}
