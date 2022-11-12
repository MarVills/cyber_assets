import { createAction, props } from '@ngrx/store';
import { Equipment, EquipmentDTO } from '../state/equipments.state';



export const requestFetchEquipmentsACTION = createAction(
  '[Products] Request Fetch Equipments',
  props<{ page: number }>()
);
export const successFetchEquipmentsACTION = createAction(
 '[Products] Success Fetch Equipments',
  props<{payload: EquipmentDTO[] }>(),

);

export const requestFetchEquipmentACTION = createAction(
  '[ Products ] Request Fetch Equipment',
  props<{payload: number }>()
);
export const successFetchEquipmentACTION = createAction(
  '[ Products ] Success Fetch Equipment',
  props<{payload: EquipmentDTO }>()
);

export const requestAddEquipmentACTION = createAction(
  '[ Products ] Request Add Equipment',
  props<{payload: Equipment}>()
);

export const successAddEquipmentACTION = createAction(
  '[ Products ] Success Add Equipment',
  props<{payload: EquipmentDTO}>()
);

export const requestDeleteEquipmentACTION = createAction(
  '[ Products ] Request Delete Equipment',
  props<{payload: number}>()
);

export const successDeleteEquipmentACTION = createAction(
  '[ Products ] Success Delete Equipment',
);

export const requestUpdateEquipmentACTION = createAction(
  '[Products] Request Update Equipment',
  props<{ id: any, payload: any }>()
);

export const successUpdateEquipmentACTION = createAction(
  '[ Products ] Success Update Equipment',
  props<{payload: EquipmentDTO}>()
);

export const onEquipmentFailure = createAction(
  '[ Products ] Products Failure',
  props<{ error: any }>()
);

// export const loadEquipments = createAction(
//   '[Equipments] Load Equipmentss'
// );

// export const loadEquipmentsSuccess = createAction(
//   '[Equipments] Load Equipmentss Success',
//   props<{ data: any }>()
// );

// export const loadEquipmentsFailure = createAction(
//   '[Equipments] Load Equipmentss Failure',
//   props<{ error: any }>()
// );

