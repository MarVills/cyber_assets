import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Equipment, EquipmentDTO, EQUIPMENT_DATA, CATEGORY_DATA, Category } from 'src/app/Models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService implements OnDestroy{

  fetchEquipments$!: Subscription;
  fetchCategory$!: Subscription;
  isEdit:boolean = false;
  toEditData!:EquipmentDTO;
  observable1$ = this.getObservable1(this.fireStore.collection('equipments')) as Observable<Equipment[]>;
  observable2$ = this.getObservable2(this.fireStore.collection('categories')) as Observable<Category[]>;
  
  constructor(private fireStore: AngularFirestore) { }

  ngOnDestroy(): void {
    this.fetchEquipments$.unsubscribe();
    this.fetchCategory$.unsubscribe();
  }

  getObservable1(collection: AngularFirestoreCollection<Equipment>){
    const subject = new BehaviorSubject<Equipment[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: Equipment[]) => {
      subject.next(val);
    });
    return subject;
  };

  getObservable2(collection: AngularFirestoreCollection<Category>){
    const subject = new BehaviorSubject<Category[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: Category[]) => {
      subject.next(val);
    });
    return subject;
  };

  onFetchEquipments(){
    this.fetchEquipments$ = this.observable1$.subscribe((response) => {
      EQUIPMENT_DATA.splice(0)
      for (var res of response) {
        EQUIPMENT_DATA.push(res);
      }
    })
  }

  onAddEquipment(data: Equipment){
    return this.fireStore.collection('equipments').add(data)
  }

  onEditEquipment(currentData: EquipmentDTO, newData: Equipment){
    console.log('data',currentData)
    EQUIPMENT_DATA[EQUIPMENT_DATA.indexOf({
      equipment: currentData.equipment,
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

  onFetchCategories(){
    this.fetchCategory$ = this.observable2$.subscribe((response) => {
      CATEGORY_DATA.splice(0)
      for (var res of response) {
        console.log("ressss", res)
        CATEGORY_DATA.push(res);
      }
    })
  }

  onAddCategory(category: string){
    return this.fireStore.collection('categories').add(category)
  }

  // onEditEquipment(currentData: EquipmentDTO, newData: Equipment){
  //   console.log('data',currentData)
  //   EQUIPMENT_DATA[EQUIPMENT_DATA.indexOf({
  //     equipment: currentData.equipment,
  //     status: currentData.status,
  //     price: currentData.price, 
  //     category: currentData.category,
  //     description: currentData.description
  //   })] = newData;
  //   return this.fireStore.collection('equipments').doc(currentData.id).update(newData);
  // }
}
