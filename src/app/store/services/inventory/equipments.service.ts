import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipment, EquipmentDTO, EQUIPMENT_DATA } from '../../state/equipments.state';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  equipments$ = this.getObservable(this.fireStore.collection('equipments')) as Observable<Equipment[]>;
  isEdit:boolean = false;
  toEditData!:EquipmentDTO;

  constructor(private fireStore: AngularFirestore) { }

  getObservable(collection: AngularFirestoreCollection<Equipment>){
    const subject = new BehaviorSubject<Equipment[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: Equipment[]) => {
      subject.next(val);
    });
    return subject;
  };

  onFetchEquipments(){
    this.equipments$.subscribe((responseDTO) => {
      EQUIPMENT_DATA.splice(0)
      for (var response of responseDTO) {
        EQUIPMENT_DATA.push(response);
      }
    })
  }

  onAddEquipment(data: any){
    return this.fireStore.collection('equipments').add(data)
  }

  onEditEquipment(currentData: EquipmentDTO, newData: Equipment){
    EQUIPMENT_DATA[EQUIPMENT_DATA.indexOf({
      name: currentData.name,
      status: currentData.status,
      price: currentData.price, 
      category: currentData.category,
      description: currentData.description
    })] = newData;
    return this.fireStore.collection('equipments').doc(currentData.id).update(newData);
  }

  onDeleteEquipment(data: EquipmentDTO){
    EQUIPMENT_DATA.splice(EQUIPMENT_DATA.indexOf(data), 1)
    return this.fireStore.collection('equipments').doc(data.id).delete();
  }
  
}
