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
import { Router } from '@angular/router';

@Injectable()
export class EquipmentsEffects {
  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService,
    private store: Store,
    private http: HttpClient,
    private equipmentService: EquipmentService,
    private router: Router
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
            catchError((error: any) => {
              console.log('Fetch Error: ', error);
              if (error.status == 401){
                this.router.navigate(['/authentication/login'])
              }
              return of(equipmentActions.onEquipmentFailure({ error: error }));
            })
          );
      })
    )
  );

  selectEquipmentEFFECT$: Observable<Action> = createEffect(()=>
    this.actions$.pipe(
      ofType(equipmentActions.requestSelectEquipmentACTION),
      switchMap((response)=>{
        return [equipmentActions.successSelectEquipmentACTION({payload: response})];
      }),
      catchError((error)=>{
        return [equipmentActions.onEquipmentFailure({error: error})]
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
        return this.equipmentService.updateEquipment(equipment.payload, equipment.id).pipe(
          switchMap((response)=>{
             this.sharedService.openSnackBar(
              'Equipment updated successfuly',
              'Ok'
            );
            return [equipmentActions.successUpdateEquipmentACTION()];
          }),
          catchError((error) => {
            console.log('Update Error: ', error);
            this.sharedService.openSnackBar('Failed updating equipment', 'Ok');
            return [equipmentActions.onEquipmentFailure({ error: error })];
          }),
        )
        
        
        // this.fireStore
        //   .collection('equipments')
        //   .doc(equipment.id.toString())
        //   .update(equipment.payload)
        //   .then(() => {
        //     this.sharedService.openSnackBar(
        //       'Equipment updated successfuly',
        //       'Ok'
        //     );
        //     return equipmentActions.successUpdateEquipmentACTION();
        //   })
        //   .catch((error) => {
        //     console.log('Update Error: ', error);
        //     this.sharedService.openSnackBar('Failed updating equipment', 'Ok');
        //     return equipmentActions.onEquipmentFailure({ error: error });
        //   });
      })
    )
  );

  deleteEquipmentEFFEET$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(equipmentActions.requestDeleteEquipmentACTION),
      switchMap((response) => {
        return this.equipmentService.deleteEquipment(response.id).pipe(
          switchMap((response)=>{ 
            console.log("delete effect response", response)
            this.sharedService.openSnackBar( 'Equipment deleted successfuly','Ok');
            return [equipmentActions.successDeleteEquipmentACTION(response)];
          }),
           catchError((error) => {
            console.log('Delete Error: ', error);
            this.sharedService.openSnackBar('Failed deleting equipment', 'Ok');
            return [equipmentActions.onEquipmentFailure({ error: error })];
          }),
        )
      })
    )
  );
}
