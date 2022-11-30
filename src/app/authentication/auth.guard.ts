import { Injectable, OnInit } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../store/services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, OnInit {

  constructor(
    private routes: Router, 
    private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.isLoggedIn()
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('uid') != null) {
      return true;
    } else {
      this.routes.navigate(['/authentication/login']);
      return false;
    }

  }
}
