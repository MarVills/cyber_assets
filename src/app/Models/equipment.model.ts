export interface Equipment {
  id?: number;
  item_name: string;
  status: string;
  category_id: number;
  serial_no?: string;
  description: string;
  user_id: number;
}

export interface EquipmentDTO {
  id?: number;
  item_name: string;
  status: string;
  category_id: number;
  serial_no: string;
  description: string;
  user_id: number;
}

export interface EquipmentsWithSelectedStatus {
  isSelected: boolean;
  items: Equipment[];
}

export const EQUIPMENT_DATA: Equipment[] = [];
