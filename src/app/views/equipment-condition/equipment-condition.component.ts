import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EQUIPMENT_CONDITIONS } from 'src/app/shared/equipment-conditions/equipment-conditions';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import {
  Equipment,
  EQUIPMENT_DATA,
  EquipmentsWithSelectedStatus,
  EquipmentDTO,
} from 'src/app/Models/equipment.model';
import { Category, CATEGORY_DATA } from 'src/app/Models/category.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ManageAccountService } from 'src/app/store/services/manage-account.service';
import { Store } from '@ngrx/store';
import { selectEquipment } from 'src/app/store/equipments/equipments.selectors';
import { Subscription } from 'rxjs';
import { selectCategory } from 'src/app/store/categories/categories.selectors';

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
  equipmentsByCategory: Map<string, EquipmentsWithSelectedStatus> = new Map<
    string,
    EquipmentsWithSelectedStatus
  >();
  displayedColumns = ['serialNumber', 'equipmentName', 'status'];
  selectedEquipments: any;
  _searchEquipmentForm!: FormGroup;
  equipmentSubscription$!: Subscription;
  categoriesSubscription$!: Subscription;

  constructor(
    breakpointObserver: BreakpointObserver,
    private equipmentsService: EquipmentsService,
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
        this.equipment = response;
      });
    this.categoriesSubscription$ = this.store
      .select(selectCategory)
      .subscribe((response) => {
        this.categories = response.categories;
        this.setEquipmentsByCategories();
      });

    this.searchEquipmentForm();
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
        (item) => item.category === category.category_name
      );
      const isSlectedCategory: EquipmentsWithSelectedStatus = {
        isSelected: false,
        items: filteredEquipment,
      };
      filteredEquipment
        ? this.equipmentsByCategory.set(category.category_name, isSlectedCategory)
        : null;
    });
  }

  onConditionChange(data: string) {
    const previousData = this.equipmentsService.toEditData;

    const latestData: Equipment = {
      item_name: previousData.item_name,
      category: previousData.category,
      status: data,
      description: previousData.description,
      serial_no: previousData.serial_no,
    };

    this.equipmentsService.onEditEquipment(
      this.equipmentsService.toEditData,
      latestData
    );
  }

  onSelectionClicked(data: Equipment) {
    this.equipmentsService.toEditData = data;
  }
}
