
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { EQUIPMENT_CONDITIONS } from 'src/app/shared/equipment-conditions/equipment-conditions';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
import { Equipment, EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { CATEGORY_DATA } from 'src/app/Models/equipment.model';


@Component({
  selector: 'app-equipment-condition',
  templateUrl: './equipment-condition.component.html',
  styleUrls: ['./equipment-condition.component.scss'],
})
export class EquipmentConditionComponent implements  OnInit{

  panelOpenState = false;
  step = 0;
  equipmentConditions = EQUIPMENT_CONDITIONS;
  categories = CATEGORY_DATA;
  equipments =  EQUIPMENT_DATA;
  equipmentsByCategory:Map<string, Equipment[]> = new Map<string, Equipment[]>();

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

  displayedColumns = ['serialNumber', 'equipmentName', 'status'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); 
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
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
    let equipmentsByCategory:Map<string, Equipment[]> = new Map<string, Equipment[]>()

      this.categories.forEach((category)=>{
      let filteredEquipment = this.equipments.filter((equipment)=>equipment.category === category.category);
      if(filteredEquipment ){
        equipmentsByCategory.set(category.category, filteredEquipment)
      }
      console.log("========", equipmentsByCategory)
    })
  }
}

const ELEMENT_DATA: Element[] = [
  { serialNumber: 1, equipmentName: 'Hydrogen',   status: 'Good' },
  { serialNumber: 2, equipmentName: 'Helium',   status: 'Fair/Poor' },
  { serialNumber: 3, equipmentName: 'Lithium',  status: 'Scrap/Damaged' },
  { serialNumber: 4, equipmentName: 'Beryllium',   status: 'Good' },
  { serialNumber: 5, equipmentName: 'Boron',   status: 'Good' },
  { serialNumber: 6, equipmentName: 'Carbon', status: 'Good' },
  { serialNumber: 7, equipmentName: 'Nitrogen',   status: 'Fair/Poor' },
  { serialNumber: 8, equipmentName: 'Oxygen',  status: 'Good' },
  { serialNumber: 9, equipmentName: 'Fluorine',  status: 'Good' },
  { serialNumber: 10, equipmentName: 'Neon',  status: 'Good' },
  { serialNumber: 11, equipmentName: 'Sodium',   status: 'Borrowed' },
  { serialNumber: 12, equipmentName: 'Magnesium',   status: 'Fair/Poor' },
  { serialNumber: 13, equipmentName: 'Aluminum',   status: 'Repaired' },
  { serialNumber: 14, equipmentName: 'Silicon',   status: 'Good' },
  { serialNumber: 15, equipmentName: 'Phosphorus',   status: 'Missing' },
  { serialNumber: 16, equipmentName: 'Sulfur',   status: 'Good' },
  { serialNumber: 17, equipmentName: 'Chlorine',   status: 'Good' },
  { serialNumber: 18, equipmentName: 'Argon',   status: 'Good' },
  { serialNumber: 19, equipmentName: 'Potassium',   status: 'Good' },
  { serialNumber: 20, equipmentName: 'Calcium',   status: 'Good' }
];

export interface Element {
  serialNumber: number;
  equipmentName: string;
  status: string;
  
}


