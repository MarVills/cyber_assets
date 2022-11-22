import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import * as categoryActions from '../categories/categories.actions';


@Injectable()
export class CategoriesEffects {

  constructor(private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService) {}

  fetchCategoriesEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(categoryActions.requestFetchCategoriesACTION),
    switchMap(()=>{
      return this.fireStore.collection('categories').valueChanges({ idField: 'id' }).pipe(
        switchMap((response)=>{
          return [categoryActions.successFetchCategoriesACTION({ payload: response })]
        }),
        catchError((error: Error) => {
         console.log("Fetch Error: ", error)
         return of(categoryActions.onCategoryFailure({ error: error }))
        })
      )
    })
  ));

  addCategoryEFFECT$: Observable<Action> = createEffect(() => { 
    return this.actions$.pipe(
      ofType(categoryActions.requestAddCategoryACTION),
      switchMap((data)=>{
        return this.fireStore.collection('categories').add(data.payload).then(()=>{
          this.sharedService.openSnackBar("Category added successfuly", "Ok");
          return categoryActions.successAddCategoryACTION()
        }).catch((error)=>{
          console.log("Add Error: ", error)
          this.sharedService.openSnackBar("Failed adding category", "Ok");
          return categoryActions.onCategoryFailure({ error: error })
        })
      })
    )}
  );

  updateCategoryEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(categoryActions.requestUpdateCategoryACTION),
    switchMap((data)=>{
      return this.fireStore.collection('categories').doc(data.id).update(data.payload).then(()=>{
        this.sharedService.openSnackBar("Category updated successfuly", "Ok");
        return categoryActions.successUpdateCategoryACTION()
      }).catch((error)=>{
        console.log("Update Error: ", error)
        this.sharedService.openSnackBar("Failed updating category", "Ok");
        return categoryActions.onCategoryFailure({ error: error })
      })
    })
  ));

  deleteEquipmentEFFEET$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(categoryActions.requestDeleteCategoryACTION),
    switchMap((docID)=>{
      return this.fireStore.collection('categories').doc(docID.payload).delete().then(()=>{
        this.sharedService.openSnackBar("Category deleted successfuly", "Ok");
        return categoryActions.successAddCategoryACTION()
      }).catch((error)=>{
        console.log("Delete Error: ", error)
        this.sharedService.openSnackBar("Failed deleting category", "Ok");
        return categoryActions.onCategoryFailure({ error: error })
      })
    })
  ));

}
