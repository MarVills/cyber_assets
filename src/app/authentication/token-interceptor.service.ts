import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, switchMap, take } from 'rxjs/operators';
import { selectAuthState } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthState).pipe(
      take(1),
      exhaustMap(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}

export const tokenInterceptorService = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
];
