import { createAction, props } from '@ngrx/store';
import { ActivityLog } from 'src/app/Models/activity-log-model';
import { Equipment, EquipmentDTO } from '../../Models/equipment.model';

export const requestFetchEquipmentACTION = createAction(
  '[Equipments] Request Fetch Equipments'
);
export const successFetchEquipmentACTION = createAction(
  '[Equipments] Success Fetch Equipments',
  props<{ payload: any }>()
);

export const requestAddEquipmentACTION = createAction(
  '[ Equipments ] Request Add Equipment',
  props<{ payload: Equipment; addItemLog: ActivityLog }>()
);
export const successAddEquipmentACTION = createAction(
  '[ Equipments ] Success Add Equipment',
  props<{ payload: Equipment }>()
);

export const requestDeleteEquipmentACTION = createAction(
  '[ Equipments ] Request Delete Equipment',
  props<{ payload: string }>()
);
export const successDeleteEquipmentACTION = createAction(
  '[ Equipments ] Success Delete Equipment'
);

export const requestUpdateEquipmentACTION = createAction(
  '[ Equipments ] Request Update Equipment',
  props<{ id: string; payload: Equipment }>()
);
export const successUpdateEquipmentACTION = createAction(
  '[ Equipments ] Success Update Equipment'
);

export const onEquipmentFailure = createAction(
  '[ Equipments ] Equipments Failure',
  props<{ error: any }>()
);
