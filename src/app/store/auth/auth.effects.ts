import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import * as authActions from './auth.actions';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AccountCredentials } from 'src/app/Models/manage-account.model';
import { selectAuthState } from './auth.selectors';

@Injectable()
export class AuthEffects {
  config = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      Accept: 'Application/json',
    }),
  };
  constructor(
    private actions$: Actions,
    private routes: Router,
    private angularFireAuth: AngularFireAuth,
    private sharedService: SharedService,
    private http: HttpClient,
    private store: Store,
    private authService: AuthService
  ) {}

  loginEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestAuthLogin),
      switchMap((response) => {
        return this.authService.loginAuth(response.payload).pipe(
          switchMap((response: any) => {
            const res = response as Map<string, string>;
            localStorage.setItem('access_token', response.access_token);
            this.routes.navigate(['/dashboard']);
            return [authActions.successAuthLogin({ payload: response })];
          }),
          catchError((error) => {
            this.sharedService.openSnackBar(error.message);
            return of(authActions.authFailure(error));
          })
        );
      })
    )
  );

  logoutEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestAuthLogout),
      switchMap(() => {
        console.log('loggingOut');
        return this.authService.logoutAuth().pipe(
          switchMap((response: any) => {
            localStorage.removeItem('access_token');
            location.reload();
            this.sharedService.openSnackBar(response.message);
            return [authActions.successAuthLogout()];
          }),
          catchError((error) => {
            return of(authActions.authFailure(error));
          })
        );
      })
    )
  );
}
