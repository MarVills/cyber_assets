import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CATEGORY_DATA, Category } from 'src/app/Models/equipment.model';
import * as categoryActions from '../../../categories/categories.actions';
import { selectCategory } from '../../../categories/categories.selectors';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnDestroy{

  fetchEquipments$!: Subscription;
  fetchCategory$!: Subscription;

  constructor(
    private fireStore: AngularFirestore,
    private store: Store,) { }

  ngOnDestroy(): void {
    this.fetchEquipments$.unsubscribe();
    this.fetchCategory$.unsubscribe();
  }

  onFetchCategories(){
    this.store.dispatch(categoryActions.requestFetchCategoriesACTION({payload: []}));
    this.fetchCategory$ = this.store.select( selectCategory ).subscribe((response) => {
      CATEGORY_DATA.splice(0)
      for (var res of response.categories) {
        CATEGORY_DATA.push(res);
      }
    })
  }

  onAddCategory(category: Category){
    this.store.dispatch(categoryActions.requestAddCategoryACTION({payload: category}))
  }

  onEditCategory(index: number, newData: Category){
    CATEGORY_DATA[index] = newData;
    this.store.dispatch(categoryActions.requestUpdateCategoryACTION({id: CATEGORY_DATA[index].id!, payload: newData}))
  }

  onDeleteCategory(data: Category){
    CATEGORY_DATA.splice(CATEGORY_DATA.indexOf(data), 1)
    this.store.dispatch(categoryActions.requestDeleteCategoryACTION({ payload: data.id!}))
  }
}
