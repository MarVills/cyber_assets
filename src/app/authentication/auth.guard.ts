import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../store/services/auth/auth.service';
import { EquipmentsService } from '../store/services/inventory/equipments/equipments.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnInit {
  constructor(
    private routes: Router,
    private authService: AuthService,
    private equipmentsService: EquipmentsService,
    private angularFireAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.authService.isLoggedIn();
    // this.equipmentsService.onFetchEquipments();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Still working on this, temporary functiontions for the meantime
    if (localStorage.getItem('access_token') != null) {
      return true;
    } else {
      this.routes.navigate(['/authentication/login']);
      return false;
    }
  }
}
