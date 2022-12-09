import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Equipments, EquipmentsState } from '../state/equipments.state';

export const selectEquipmentsFeatureState =
  createFeatureSelector<any>('equipment');
export const selectEquipment = createSelector(
  selectEquipmentsFeatureState,
  (state: EquipmentsState) => state.equipment
);
