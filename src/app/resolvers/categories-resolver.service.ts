import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap, take } from 'rxjs/operators';
import { selectCategory } from '../store/categories/categories.selectors';
import { Categories } from '../store/state/categories.state';
import * as categoryActions from '../store/categories/categories.actions';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolverService implements Resolve<Categories[]> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Categories[]> {
    return this.store.select(selectCategory).pipe(
      first(),
      switchMap((response) => {
        if (response.categories.length == 0) {
          this.store.dispatch(categoryActions.requestFetchCategoriesACTION());
        }
        return of(response.categories);
      })
    );
  }
}
