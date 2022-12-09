import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import * as equipmentActions from './equipments.actions';
import * as logActions from '../activity-log/activity-log.actions';
import { ActivityLog } from 'src/app/Models/activity-log-model';
import { HttpClient } from '@angular/common/http';
import { EquipmentService } from './equipment.service';

@Injectable()
export class EquipmentsEffects {
  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService,
    private store: Store,
    private http: HttpClient,
    private equipmentService: EquipmentService
  ) {}

  fetchEquipmentsEFFECT$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(equipmentActions.requestFetchEquipmentACTION),
      switchMap(() => {
        return this.equipmentService.fetchEquipment()
          .pipe(
            switchMap((response) => {
              return [
                equipmentActions.successFetchEquipmentACTION({
                  payload: response,
                }),
              ];
            }),
            catchError((error: Error) => {
              console.log('Fetch Error: ', error);
              return of(equipmentActions.onEquipmentFailure({ error: error }));
            })
          );
      })
    )
  );

  addEquipmentEFFECT$: Observable<Action> = createEffect(() => 
      this.actions$.pipe(
      ofType(equipmentActions.requestAddEquipmentACTION),
      switchMap((data) => {
        return this.equipmentService.addEquipment(data.payload)
        .pipe(
          switchMap((response: any)=>{
            return [equipmentActions.successAddEquipmentACTION(data)];
          }),
          catchError((error:any) => {
            console.log('Add Error: ', error);
            this.sharedService.openSnackBar('Failed adding equipment', 'Ok');
            return [equipmentActions.onEquipmentFailure({ error: error })];
         }),
        )
      })
    )
  );

  updateEquipmentEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(equipmentActions.requestUpdateEquipmentACTION),
      switchMap((equipment) => {
        return this.fireStore
          .collection('equipments')
          .doc(equipment.id)
          .update(equipment.payload)
          .then(() => {
            this.sharedService.openSnackBar(
              'Equipment updated successfuly',
              'Ok'
            );
            return equipmentActions.successUpdateEquipmentACTION();
          })
          .catch((error) => {
            console.log('Update Error: ', error);
            this.sharedService.openSnackBar('Failed updating equipment', 'Ok');
            return equipmentActions.onEquipmentFailure({ error: error });
          });
      })
    )
  );

  deleteEquipmentEFFEET$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(equipmentActions.requestDeleteEquipmentACTION),
      switchMap((docID) => {
        return this.fireStore
          .collection('equipments')
          .doc(docID.payload)
          .delete()
          .then(() => {
            this.sharedService.openSnackBar(
              'Equipment deleted successfuly',
              'Ok'
            );

            return equipmentActions.successDeleteEquipmentACTION();
          })
          .catch((error) => {
            console.log('Delete Error: ', error);
            this.sharedService.openSnackBar('Failed deleting equipment', 'Ok');
            return equipmentActions.onEquipmentFailure({ error: error });
          });
      })
    )
  );
}
