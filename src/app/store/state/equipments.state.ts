import { DecimalPipe } from "@angular/common";

export interface Equipment {
    id?: string;
    name: string;
    status: string;
    price: number;
    category: string;
    description: string;
  }
  export interface EquipmentDTO {
    id: string;
    name: string;
    status: string;
    price: number;
    category: string;
    description: string;
  }
  
  export const EQUIPMENT_DATA: Equipment[] = [
 
  ];