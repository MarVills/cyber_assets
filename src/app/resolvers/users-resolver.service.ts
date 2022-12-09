import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { User } from '../shared/user-details/user-details';
import { selectUserDetail } from '../store/user-details/user-details.selectors';
import * as userDetailActions from '../store/user-details/user-details.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersResolverService implements Resolve<User[]> {
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.store.select(selectUserDetail).pipe(
      first(),
      switchMap((response) => {
        if (response.users.length == 0) {
          this.store.dispatch(
            userDetailActions.requestFetchUserDetailsACTION()
          );
        }
        return of(response.users);
      })
    );
  }
}
