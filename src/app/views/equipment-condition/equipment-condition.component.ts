import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EQUIPMENT_CONDITIONS } from 'src/app/shared/equipment-conditions/equipment-conditions';
import {
  Equipment,
  EquipmentsWithSelectedStatus,
} from 'src/app/Models/equipment.model';
import { Category } from 'src/app/Models/category.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectEquipment } from 'src/app/store/equipments/equipments.selectors';
import { Observable, of, Subscription } from 'rxjs';
import { selectCategory } from 'src/app/store/categories/categories.selectors';
import * as equipmentActions from '../../store/equipments/equipments.actions' 
import { selectUserData } from 'src/app/store/auth/auth.selectors';
import { ActivityLog } from 'src/app/Models/activity-log-model';

@Component({
  selector: 'app-equipment-condition',
  templateUrl: './equipment-condition.component.html',
  styleUrls: ['./equipment-condition.component.scss'],
})
export class EquipmentConditionComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  equipmentConditions = Object.values(EQUIPMENT_CONDITIONS);
  categories: Category[] = [];
  equipment: Equipment[] = [];
  equipmentsByCategory: Map<string, EquipmentsWithSelectedStatus> = new Map<string, EquipmentsWithSelectedStatus>();
  categorizedEquipment$: Observable<Map<string, EquipmentsWithSelectedStatus>> = new Observable<Map<string, EquipmentsWithSelectedStatus>>();
  displayedColumns = ['serialNumber', 'equipmentName', 'status'];
  selectedEquipments: any;
  _searchEquipmentForm!: FormGroup;
  equipmentSubscription$!: Subscription;
  categoriesSubscription$!: Subscription;
  selectedEquipment!: any;

  constructor(
    breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['serialNumber', 'equipmentName', 'status']
        : ['serialNumber', 'equipmentName', 'status'];
    });
  }
  ngOnDestroy(): void {
    this.equipmentSubscription$.unsubscribe();
    this.categoriesSubscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.equipmentSubscription$ = this.store
      .select(selectEquipment)
      .subscribe((response) => {
        this.equipment = response.equipment;
      });
    this.categoriesSubscription$ = this.store
      .select(selectCategory)
      .subscribe((response) => {
        this.categories = response.categories;
        this.setEquipmentsByCategories();
      });
    this.searchEquipmentForm();

    this.store.select(selectEquipment).subscribe((response)=>{
      this.selectedEquipment = response.selectedItem
    })
  }

  searchEquipmentForm() {
    this._searchEquipmentForm = this.formBuilder.group({
      searchEquipment: new FormControl(''),
    });
  }

  panelClicked(category: any) {
    this.selectedEquipments = category;
    this._searchEquipmentForm.reset();
  }

  applyFilter(filterValue: string, category: any) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    const equipments: EquipmentsWithSelectedStatus = category.value;
    if (equipments.items.length != 0) {
      let filteredValue = equipments.items.filter((equipmentDetails) => {
        return (
          equipmentDetails.item_name +
          equipmentDetails.status.includes(filterValue)
        );
      });
      const values: EquipmentsWithSelectedStatus = {
        isSelected: equipments.isSelected,
        items: filteredValue,
      };
      const key = category.key;
      this.selectedEquipments = { key: key, value: values };
    }
  }

  setEquipmentsByCategories() {
    this.categories.forEach((category) => {
      const filteredEquipment = this.equipment.filter(
        (item) =>  { 
          return Number(item.category_id) === category.id
        }
      );
      const isSlectedCategory: EquipmentsWithSelectedStatus = {
        isSelected: false,
        items: filteredEquipment,
      };
      filteredEquipment
        ? this.equipmentsByCategory.set(category.category_name, isSlectedCategory)
        : null;
    });
    this.categorizedEquipment$ = of(this.equipmentsByCategory)
  }

  onConditionChange(status: string) {
  
    this.store.select(selectUserData).subscribe((userResponse)=>{
        const latestData: Equipment = {
          item_name: this.selectedEquipment.payload.item_name,
          category_id: this.selectedEquipment.payload.category_id,
          status: status,
          description: this.selectedEquipment.payload.description,
          serial_no: this.selectedEquipment.payload.serial_no,
          user_id: 0,
        };
        const updateEquipmentLog: ActivityLog = {
            activity: `${this.selectedEquipment.item_name} item updated`,
            user_id: userResponse.userData.id,
            date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          };
      this.store.dispatch(equipmentActions.requestUpdateEquipmentACTION({id: this.selectedEquipment.payload.id!, payload: latestData, itemLog: updateEquipmentLog}))
    })
  }

  onSelectionClicked(data: Equipment) {
     this.store.dispatch(equipmentActions.requestSelectEquipmentACTION({payload: data }))
  }
}
