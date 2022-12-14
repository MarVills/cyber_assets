import { createReducer, on } from '@ngrx/store';
import { EquipmentsState } from '../state/equipments.state';
import * as equipmentsAction from './equipments.actions';

export const equipmentsFeatureKey = 'equipments';

export const initialState: EquipmentsState = {
  equipment: [],
  selectedItem: {
    item_name: "",
    status: "GOOD",
    category_id: 0,
    serial_no: "",
    description: "",
    user_id: 0
  }
};

export const equipmentReducer = createReducer(
  initialState,

  on(
    equipmentsAction.successFetchEquipmentACTION,
    (state: EquipmentsState, { payload }) => {
      return {
        ...state.equipment,
        equipment: payload,
      };
    }
  ),

  on(
    equipmentsAction.successSelectEquipmentACTION,
    (state: EquipmentsState, { payload }) => {
      return {
        ...state,
        selectedItem: payload,
      };
    }
  ),

  on(
    equipmentsAction.successAddEquipmentACTION,
    (state: EquipmentsState, { payload }) => {
      const newState = [...state.equipment,  payload]  
      return {...state, equipment: newState};  
    }
  ),

  on(
    equipmentsAction.requestUpdateEquipmentACTION,
    (state: EquipmentsState, { id, payload }) => {
      const updateItem = state.equipment.map((equipment: any) => {
        return id === equipment.id ? payload : equipment;
      });
      const returnState = { ...state, equipment: updateItem };
      return returnState;
    }
  ),

   on(
    equipmentsAction.requestDeleteEquipmentACTION,
    (state: EquipmentsState, { id }) => {
      const filterEquipment = state.equipment.filter(
        (item:any)=>item.id != id)
      return { ...state, equipment: filterEquipment };
    }
  ),
);
