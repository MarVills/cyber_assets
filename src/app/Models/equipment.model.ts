export interface Equipment {
  id?: string;
  item_name: string;
  status: string;
  category: string;
  serial_no?: string;
  description: string;
}

export interface EquipmentDTO {
  id?: string;
  item_name: string;
  status: string;
  category_id: number;
  serial_no: string;
  description: string;
}

export interface EquipmentsWithSelectedStatus {
  isSelected: boolean;
  items: Equipment[];
}

export const EQUIPMENT_DATA: Equipment[] = [];
