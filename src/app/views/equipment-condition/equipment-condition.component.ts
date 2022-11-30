
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EQUIPMENT_CONDITIONS } from 'src/app/shared/equipment-conditions/equipment-conditions';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import { Equipment, EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { CATEGORY_DATA } from 'src/app/Models/category.model';


@Component({
  selector: 'app-equipment-condition',
  templateUrl: './equipment-condition.component.html',
  styleUrls: ['./equipment-condition.component.scss'],
})
export class EquipmentConditionComponent implements  OnInit {

  panelOpenState = false;
  step = 0;
  equipmentConditions = Object.values(EQUIPMENT_CONDITIONS);
  categories = CATEGORY_DATA;
  equipments =  EQUIPMENT_DATA;
  equipmentsByCategory: Map<string, Equipment[]> = new Map<string, Equipment[]>();
  displayedColumns = ['serialNumber', 'equipmentName', 'status'];

  constructor(breakpointObserver: BreakpointObserver,
             private equipmentsService: EquipmentsService,
             private categoriesService: CategoriesService){
      breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        this.displayedColumns = result.matches ?
            ['serialNumber', 'equipmentName', 'status'] :
            ['serialNumber', 'equipmentName', 'status'];
      });
  }
  
  ngOnInit(): void {
    this.equipmentsService.onFetchEquipments();
    this.categoriesService.onFetchCategories();
    this.setEquipmentsByCategories();
  }

  applyFilter(filterValue: string, category: any) {
      filterValue = filterValue.trim(); 
      filterValue = filterValue.toLowerCase();
      this.equipmentsByCategory.forEach((item)=>{
        if(item.length != 0){
          let items = item.filter((equipmentDetails)=>{
            return equipmentDetails.equipment + equipmentDetails.status.includes(filterValue)
          });
          this.equipmentsByCategory.set(category.key, items)
        }
      })
  }

  setEquipmentsByCategories(){
      this.categories.forEach((category)=>{
      let filteredEquipment = this.equipments.filter((equipment)=>equipment.category === category.category);
      filteredEquipment?this.equipmentsByCategory.set(category.category, filteredEquipment):null
    })
  }

}



