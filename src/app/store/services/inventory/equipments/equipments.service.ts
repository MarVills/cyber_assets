import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Equipment, EquipmentDTO, EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import * as equipmentActions from '../../../equipments/equipments.actions';
import * as logActions from '../../../activity-log/activity-log.actions';
import { selectEquipment } from '../../../equipments/equipments.selectors';
import { ActivityLog } from 'src/app/Models/activity-log-model';
import { User } from 'src/app/shared/user-details/user-details';
import { AuthService } from '../../authentication/auth.service';
import { SharedService } from 'src/app/shared/shared.service';


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
    private user: User,
    private authService: AuthService,
    private sharedService: SharedService) { }

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

  onAddEquipment(data: Equipment, serialNumbers: string[]){
    if(this.authService.authState){
      const userDetails = this.user.signedInUserDetails;
      const addEquipmentLog: ActivityLog = {
        activity: serialNumbers.length > 1?`Added ${serialNumbers.length} equipments`:`Added equipment`,
        userName: userDetails.firstName + userDetails.lastName,
        userRole: userDetails.userRole!,
        date: new Date().toDateString() +" "+ new Date().toLocaleTimeString()
      };
      this.store.dispatch(logActions.requestAddActivityLogACTION({payload: addEquipmentLog}))
      serialNumbers.forEach((serialNumber)=>{
          const equipment = {
          equipment: data.equipment,
          status: data.status,
          category: data.category,
          serialNumber: serialNumber,
          description: data.description
         }
         EQUIPMENT_DATA.push(equipment);
         this.store.dispatch(equipmentActions.requestAddEquipmentACTION({payload: equipment}))
      })
    }
    if(!this.authService.authState){
      this.sharedService.openSnackBar("User is not logged in! \nUser data is needed in this operation")
    }
  }

  onEditEquipment(currentData: Equipment, newData: Equipment){
    const userDetails = this.user.signedInUserDetails;
    const editEquipmentLog: ActivityLog = {
      activity: `Updated equipment`,
      userName: userDetails.firstName + userDetails.lastName,
      userRole: userDetails.userRole!,
      date: new Date().toDateString() +" "+ new Date().toLocaleTimeString()
    };
    EQUIPMENT_DATA[EQUIPMENT_DATA.indexOf(currentData)] = newData;
    this.store.dispatch(equipmentActions.requestUpdateEquipmentACTION({id: currentData.id!, payload: newData}))
    this.store.dispatch(logActions.requestAddActivityLogACTION({payload: editEquipmentLog}))
  }

  onDeleteEquipment(data: EquipmentDTO){
    const userDetails = this.user.signedInUserDetails;
    const deletedEquipmentLog: ActivityLog = {
      activity: `Deleted equipment`,
      userName: userDetails.firstName + userDetails.lastName,
      userRole: userDetails.userRole!,
      date: new Date().toDateString() +" "+ new Date().toLocaleTimeString()
    };
    EQUIPMENT_DATA.splice(EQUIPMENT_DATA.indexOf(data), 1)
    this.store.dispatch(equipmentActions.requestDeleteEquipmentACTION({payload: data.id!}))
    this.store.dispatch(logActions.requestAddActivityLogACTION({payload: deletedEquipmentLog}))
  }
}
