export interface Equipment {
    id?: string;
    equipment: string;
    status: string;
    category: string;
    serialNumber?: string;
    description: string;
  }

  export interface EquipmentDTO {
    id?: string;
    equipment: string;
    status: string;
    category: string;
    serialNumber: string;
    description: string;
  }

  export interface EquipmentsWithSelectedStatus{
    isSelected: boolean;
    items: Equipment[]
  }
  
  export const EQUIPMENT_DATA: Equipment[] = [];

  

 