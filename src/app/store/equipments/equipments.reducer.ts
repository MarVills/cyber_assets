import { createReducer, on } from '@ngrx/store';
import { Equipment } from 'src/app/Models/equipment.model';
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
      // console.log("state", state)
      // return { ...state, equipments: [state, payload]}
      return { ...state };
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
    equipmentsAction.requestDeleteEquipmentACTION,
    (state: EquipmentsState, { payload }) => {
      let newState = [state.equipment];
      newState.splice(newState.indexOf(payload), 1);
      const returnState = { ...state, equipment: newState };
      return returnState;
    }
  )
);
