import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivityLog } from 'src/app/Models/activity-log-model';
import { CATEGORY_DATA, Category } from 'src/app/Models/category.model';
import * as categoryActions from '../../../categories/categories.actions';
import * as logActions from '../../../activity-log/activity-log.actions';
import { selectCategory } from '../../../categories/categories.selectors';
import { User } from 'src/app/shared/user-details/user-details';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnDestroy{

  fetchEquipments$!: Subscription;
  fetchCategory$!: Subscription;

  constructor(
    private fireStore: AngularFirestore,
    private store: Store,
    private user: User) { }

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
    const userDetails = this.user.signedInUserDetails;
    const addCategoryLog: ActivityLog = {
      activity: `Added "${category.category}" category`,
      userName: userDetails.firstName + userDetails.lastName,
      userRole: userDetails.userRole!,
      date: new Date().toDateString() +" "+ new Date().toLocaleTimeString()
    };
    this.store.dispatch(categoryActions.requestAddCategoryACTION({payload: category}))
    this.store.dispatch(logActions.requestAddActivityLogACTION({payload: addCategoryLog}))
  }

  onEditCategory(index: number, newData: Category){
    CATEGORY_DATA[index] = newData;
    const userDetails = this.user.signedInUserDetails;
    const editCategoryLog: ActivityLog = {
      activity: `Edited category from "${CATEGORY_DATA[index].category}" to "${newData.category}" category`,
      userName: userDetails.firstName + userDetails.lastName,
      userRole: userDetails.userRole!,
      date: new Date().toDateString() +" "+ new Date().toLocaleTimeString()
    };
    this.store.dispatch(categoryActions.requestUpdateCategoryACTION({id: CATEGORY_DATA[index].id!, payload: newData}))
    this.store.dispatch(logActions.requestAddActivityLogACTION({payload: editCategoryLog}))
  }

  onDeleteCategory(category: Category){
    CATEGORY_DATA.splice(CATEGORY_DATA.indexOf(category), 1)
    const userDetails = this.user.signedInUserDetails;
    const deleteCategoryLog: ActivityLog = {
      activity: `Deleted "${category.category}" category`,
      userName: userDetails.firstName + userDetails.lastName,
      userRole: userDetails.userRole!,
      date: new Date().toDateString() +" "+ new Date().toLocaleTimeString()
    };
    this.store.dispatch(categoryActions.requestDeleteCategoryACTION({ payload: category.id!}))
    this.store.dispatch(logActions.requestAddActivityLogACTION({payload: deleteCategoryLog}))
  }
}
