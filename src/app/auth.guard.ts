<<<<<<< HEAD:src/app/authentication/auth.guard.ts
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../store/services/authentication/auth.service';
import { EquipmentsService } from '../store/services/inventory/equipments/equipments.service';
=======
import { Injectable } from '@angular/core';
>>>>>>> parent of 1165ea2 (working on activity log and report):src/app/auth.guard.ts
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
<<<<<<< HEAD:src/app/authentication/auth.guard.ts

=======
import { AuthService } from './store/services/authentication/auth.service';
>>>>>>> parent of 1165ea2 (working on activity log and report):src/app/auth.guard.ts

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private routes: Router, 
<<<<<<< HEAD:src/app/authentication/auth.guard.ts
    private authService: AuthService,
    private equipmentsService: EquipmentsService) { }
  ngOnInit(): void {
    this.authService.isLoggedIn()
    this.equipmentsService.onFetchEquipments();
  }
=======
    private authService: AuthService) { }
>>>>>>> parent of 1165ea2 (working on activity log and report):src/app/auth.guard.ts

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
