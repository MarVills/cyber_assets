import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Equipment } from '../Models/equipment.model';
import { Store } from '@ngrx/store';
import { selectEquipment } from '../store/equipments/equipments.selectors';
import { first, last, switchMap, take } from 'rxjs/operators';
import * as equipmentActions from '../store/equipments/equipments.actions';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EquipmentResolverService implements Resolve<Equipment[]> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Equipment[]> {
    return this.store.select(selectEquipment).pipe(
      first(),
      switchMap((response) => {
        if (response.length == 0) {
          this.store.dispatch(equipmentActions.requestFetchEquipmentACTION());
        }
        return of(response);
      })
    );
  }
}
