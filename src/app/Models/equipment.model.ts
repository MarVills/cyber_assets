export interface Equipment {
    id?: string;
    equipment: string;
    status: string;
    price: number;
    category: string;
    description: string;
  }

  export interface EquipmentDTO {
    id?: string;
    equipment: string;
    status: string;
    price: number;
    category: string;
    description: string;
  }
  
  export interface Category {
    id?: string;
    category: string;
    edit: boolean;
  }

  export interface CategoryDTO {
    id?: string;
    category: string;
    edit?: boolean;
  }
  
  export const EQUIPMENT_DATA: Equipment[] = [];

  export const CATEGORY_DATA: Category[] = [];

 