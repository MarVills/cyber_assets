import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../store/services/authentication/auth.service';
import { EquipmentsService } from '../store/services/inventory/equipments/equipments.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, OnInit {

  constructor(
    private routes: Router, 
    private authService: AuthService,
    private equipmentsService: EquipmentsService) { }
  ngOnInit(): void {
    this.authService.isLoggedIn()
    this.equipmentsService.onFetchEquipments();
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
