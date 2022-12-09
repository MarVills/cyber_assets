import { Equipment, EquipmentDTO } from 'src/app/Models/equipment.model';

export interface Equipments {
  equipments: Equipment[];
}
export interface EquipmentsDTO {
  equipments: EquipmentDTO[];
}
export interface EquipmentsState {
  equipment: any;
}
