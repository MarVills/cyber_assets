import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountCredentials } from 'src/app/Models/manage-account.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginAuth(payload: AccountCredentials): Observable<any> {
    const url: string = '/api/auth/login';
    return this.http.post(url, payload);
  }

  logoutAuth(): Observable<Object> {
    const url: string = '/api/auth/logout';
    return this.http.post(url, {});
  }
}
