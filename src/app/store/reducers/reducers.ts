import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as equipment from '../equipments/equipments.reducer';
import * as category from '../categories/categories.reducer';
import * as activityLog from '../activity-log/activity-log.reducer';
import * as auth from '../auth/auth.reducer';
import * as users from '../user-details/user-details.reducer';
import { EquipmentsState } from '../state/equipments.state';
import { CategoriesState } from '../state/categories.state';
import { AuthState } from '../state/auth.state';
import { ActivityLogsState } from '../state/activity-log.state';
import { UserDetailState } from '../state/user-details.state';

export const appFeatureKey = 'app';

export interface AppState {
  equipment: EquipmentsState;
  categories: CategoriesState;
  activityLogs: ActivityLogsState;
  auth: AuthState;
  users: UserDetailState;
}

export const appReducers: ActionReducerMap<AppState> = {
  equipment: equipment.equipmentReducer,
  categories: category.categoryReducer,
  activityLogs: activityLog.activityLogReducer,
  auth: auth.authReducer,
  users: users.usersReducer,
};

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
