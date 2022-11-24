
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { EQUIPMENT_CONDITIONS } from 'src/app/shared/equipment-conditions/equipment-conditions';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import { Category, Equipment, EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { CATEGORY_DATA } from 'src/app/Models/equipment.model';


@Component({
  selector: 'app-equipment-condition',
  templateUrl: './equipment-condition.component.html',
  styleUrls: ['./equipment-condition.component.scss'],
})
export class EquipmentConditionComponent implements  OnInit {

  panelOpenState = false;
  step = 0;
  equipmentConditions = EQUIPMENT_CONDITIONS;
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
      // this.dataSource.filter = filterValue;
      this.equipmentsByCategory.forEach((item)=>{
        console.log("item values", item);
        if(item.length != 0){
          let items = item.filter((equipmentDetails)=>{
            return equipmentDetails.equipment + equipmentDetails.status.includes(filterValue)
          });
          // console.log("===============",category)
          this.equipmentsByCategory.set(category.key, items)
        }
      })
  }
    
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setEquipmentsByCategories(){
      this.categories.forEach((category)=>{
      let filteredEquipment = this.equipments.filter((equipment)=>equipment.category === category.category);
      if(filteredEquipment ){
        this.equipmentsByCategory.set(category.category, filteredEquipment)
      }
    })
    console.log(this.equipmentsByCategory)
  }

}



