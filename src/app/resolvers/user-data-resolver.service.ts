import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, switchMap } from 'rxjs/operators';
import { selectUserData } from '../store/auth/auth.selectors';
import * as authActions from '../store/auth/auth.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<any>{

  constructor(private store: Store) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectUserData).pipe(
      first(),
      switchMap((response) => {
        const userData: any = response.userData;
        if (Object.keys(userData).length === 0) {
          this.store.dispatch(authActions.requestFetchUserData());
        }
        return of(response);
      })
    );
  }
}
