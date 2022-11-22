import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Equipment, EquipmentDTO, EQUIPMENT_DATA, CATEGORY_DATA, Category } from 'src/app/Models/equipment.model';
import * as equipmentActions from '../../equipments/equipments.actions';
import { selectEquipment } from '../../equipments/equipments.selectors';

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
  
  constructor(
    private fireStore: AngularFirestore,
    private store: Store,) { }

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
    this.store.dispatch(equipmentActions.requestFetchEquipmentsACTION({payload: []}));
    this.fetchEquipments$ = this.store.select( selectEquipment ).subscribe((response) => {
        EQUIPMENT_DATA.splice(0)
        for (var res of response.equipments) {
          EQUIPMENT_DATA.push(res);
        }
    })
  }

  onAddEquipment(data: Equipment){
    EQUIPMENT_DATA.push(data);
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

  onFetchCategories(){
    this.fetchCategory$ = this.observable2$.subscribe((response) => {
      CATEGORY_DATA.splice(0)
      for (var res of response) {
        CATEGORY_DATA.push(res);
      }
    })
  }

  onAddCategory(category: string){
    return this.fireStore.collection('categories').add(category)
  }

  onDeleteCategory(data: Category){
    CATEGORY_DATA.splice(CATEGORY_DATA.indexOf(data), 1)
    return this.fireStore.collection('categories').doc(data.id).delete();
  }
}
