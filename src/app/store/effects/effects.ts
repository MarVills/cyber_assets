import { EquipmentsEffects } from '../equipments/equipments.effects';
import { CategoriesEffects } from '../categories/categories.effects';
import { ActivityLogEffects } from '../activity-log/activity-log.effects';
import { AuthEffects } from '../auth/auth.effects';
import { UserDetailsEffects } from '../user-details/user-details.effects';

export const appEffects = [
  EquipmentsEffects,
  CategoriesEffects,
  ActivityLogEffects,
  AuthEffects,
  UserDetailsEffects,
];
