import { createReducer, on } from '@ngrx/store';
import { EquipmentsState } from '../state/equipments.state';
import * as equipmentsAction from './equipments.actions';

export const equipmentsFeatureKey = 'equipments';

export const initialState: EquipmentsState = {
  equipment: [],
};

export const equipmentReducer = createReducer(
  initialState,

  on(
    equipmentsAction.successFetchEquipmentACTION,
    (state: EquipmentsState, { payload }) => {
      return {
        ...state,
        equipment: payload,
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
    (state: EquipmentsState, { payload }) => {
      const updateItem = [state.equipment].map((equipment: any) => {
        return payload === equipment.id ? payload : equipment;
      });
      const returnState = { ...state, equipment: updateItem };
      return returnState;
    }
  ),

  on(
    equipmentsAction.successDeleteEquipmentACTION,
    (state: EquipmentsState, { id }) => {
      console.log("what id ", id)
      const filterEquipment = [state.equipment].filter((item)=>item.id != id)
      // newState.splice(newState.indexOf(id), 1);
      // const newState = [ ...state.equipment, filterEquipment ];
      console.log("return deleted items", filterEquipment)
      return { ...state, equipment: filterEquipment };
    }
  )
);
