import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Equipment } from '../Models/equipment.model';
import { selectEquipment } from '../store/equipments/equipments.selectors';
import * as equipmentActions from '../store/equipments/equipments.actions';

@Injectable({
  providedIn: 'root'
})
export class EquipmentConditionResolverService implements Resolve<Equipment[]> {

  constructor(private store: Store) { }
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<Equipment[]> {
    return this.store.select(selectEquipment).pipe(
      first(),
      switchMap((response) => {
        if (response.equipment.length == 0) {
          this.store.dispatch(equipmentActions.requestFetchEquipmentACTION());
        }
        return of(response.equipment);
      })
    );
  }
}
