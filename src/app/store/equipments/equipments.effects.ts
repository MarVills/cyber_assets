
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import * as equipmentActions from './equipments.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable()
export class EquipmentsEffects {

  constructor(
    private actions$: Actions,
    private fireStore: AngularFirestore,
    private sharedService: SharedService) {}

  fetchEquipmentsEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(equipmentActions.requestFetchEquipmentsACTION),
    switchMap(()=>{
      return this.fireStore.collection('equipments').valueChanges({ idField: 'id' }).pipe(
        switchMap((response)=>{
          return [equipmentActions.successFetchEquipmentsACTION({ payload: response })]
        }),
        catchError((error: Error) => {
         console.log("Fetch Error: ", error)
         return of(equipmentActions.onEquipmentFailure({ error: error }))
        })
      )
    })
  ));

  addEquipmentEFFECT$: Observable<Action> = createEffect(() => { 
    return this.actions$.pipe(
      ofType(equipmentActions.requestAddEquipmentACTION),
      switchMap((data)=>{
        return this.fireStore.collection('equipments').add(data.payload).then(()=>{
          this.sharedService.openSnackBar("Equipment added successfuly", "Ok");
          return equipmentActions.successAddEquipmentACTION()
        }).catch((error)=>{
          console.log("Add Error: ", error)
          this.sharedService.openSnackBar("Failed adding equipment", "Ok");
          return equipmentActions.onEquipmentFailure({ error: error })
        })
      })
    )}
  );

  updateEquipmentEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(equipmentActions.requestUpdateEquipmentACTION),
    switchMap((data)=>{
      return this.fireStore.collection('equipments').doc(data.id).update(data.payload).then(()=>{
        this.sharedService.openSnackBar("Equipment updated successfuly", "Ok");
        return equipmentActions.successUpdateEquipmentACTION()
      }).catch((error)=>{
        console.log("Update Error: ", error)
        this.sharedService.openSnackBar("Failed updating equipment", "Ok");
        return equipmentActions.onEquipmentFailure({ error: error })
      })
    })
  ));

  deleteEquipmentEFFEET$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(equipmentActions.requestDeleteEquipmentACTION),
    switchMap((docID)=>{
      return this.fireStore.collection('equipments').doc(docID.payload).delete().then(()=>{
        this.sharedService.openSnackBar("Equipment deleted successfuly", "Ok");
        return equipmentActions.successAddEquipmentACTION()
      }).catch((error)=>{
        console.log("Delete Error: ", error)
        this.sharedService.openSnackBar("Failed deleting equipment", "Ok");
        return equipmentActions.onEquipmentFailure({ error: error })
      })
    })
  ));
}



