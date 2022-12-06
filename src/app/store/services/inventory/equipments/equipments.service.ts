import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Equipment, EquipmentDTO, EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import * as equipmentActions from '../../../equipments/equipments.actions';
import * as logActions from '../../../activity-log/activity-log.actions';
import { selectEquipment } from '../../../equipments/equipments.selectors';
import { ActivityLog } from 'src/app/Models/activity-log-model';
import { User } from 'src/app/shared/user-details/user-details';


@Injectable({
  providedIn: 'root'
})
export class EquipmentsService implements OnDestroy{

  fetchEquipments$!: Subscription;
  fetchCategory$!: Subscription;
  isEdit:boolean = false;
  toEditData!:EquipmentDTO;

  constructor(
    private store: Store,
    private user: User) { }

  ngOnDestroy(): void {
    this.fetchEquipments$.unsubscribe();
    this.fetchCategory$.unsubscribe();
  }

  onFetchEquipments(){
    this.store.dispatch(equipmentActions.requestFetchEquipmentsACTION({payload: []}));
    this.fetchEquipments$ = this.store.select( selectEquipment ).subscribe((response) => {
        EQUIPMENT_DATA.splice(0)
        for (var res of response.equipments) {
          EQUIPMENT_DATA.push(res);
        }
    })
  }

  onAddEquipment(data: Equipment){
    const userDetails = this.user.signedInUserDetails;
    const addEquipmentLog: ActivityLog = {
      activity: "Added Equipment",
      userName: userDetails.firstName + userDetails.lastName,
      userRole: userDetails.userRole!,
      date: new Date().toDateString()
    };
    EQUIPMENT_DATA.push(data);
    this.store.dispatch(logActions.requestAddActivityLogACTION({payload: addEquipmentLog}))
    this.store.dispatch(equipmentActions.requestAddEquipmentACTION({payload: data}))
    
  }

  onEditEquipment(currentData: Equipment, newData: Equipment){
    EQUIPMENT_DATA[EQUIPMENT_DATA.indexOf(currentData)] = newData;
    this.store.dispatch(equipmentActions.requestUpdateEquipmentACTION({id: currentData.id!, payload: newData}))
  }

  onDeleteEquipment(data: EquipmentDTO){
    EQUIPMENT_DATA.splice(EQUIPMENT_DATA.indexOf(data), 1)
    this.store.dispatch(equipmentActions.requestDeleteEquipmentACTION({payload: data.id!}))
  }

}
