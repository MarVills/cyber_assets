import { createReducer, on } from '@ngrx/store';
import { EquipmentsState } from '../state/equipments.state';
import * as equipmentsAction from './equipments.actions';


export const equipmentsFeatureKey = 'equipments';

export const initialState: EquipmentsState = {
  equipments: [],
};

export const equipmentReducer = createReducer(
  initialState,

  on(equipmentsAction.successFetchEquipmentsACTION, (state: EquipmentsState, { payload }) =>{
    return { 
      ...state, 
      equipments: payload }
  }),

  on(equipmentsAction.successAddEquipmentACTION, (state: EquipmentsState) =>{
    console.log("executed reducer=========================")
    return { ...state }
  }),

  on(equipmentsAction.requestUpdateEquipmentACTION, (state: EquipmentsState, { payload }) =>{
    const updateProduct = [state.equipments].map((product:any)=> {
      return payload === product.id ? payload : product;
    })
    const returnState = { ...state, products: updateProduct, selected_product: '' }
    return returnState;
  }),

  on(equipmentsAction.requestDeleteEquipmentACTION, (state: EquipmentsState, { payload }) =>{
    let newState = [state.equipments];
    newState.splice(newState.indexOf(payload), 1);
    const returnState = { ...state, products: newState }
    return returnState;
  }),
);




