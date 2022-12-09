import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/auth.guard';
import { ErrorComponent } from './views/error/error.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EquipmentsComponent } from './views/equipments/equipments.component';
import { EquipmentConditionComponent } from './views/equipment-condition/equipment-condition.component';
import { ReportsComponent } from './views/reports/reports.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RequestComponent } from './views/request/request.component';
import { ActivityLogComponent } from './views/activity-log/activity-log.component';
import { AboutAppComponent } from './views/about-app/about-app.component';
import { ManageUsersComponent } from './views/manage-users/manage-users.component';
import { EquipmentResolverService } from './resolvers/equipment-resolver.service';
import { CategoriesResolverService } from './resolvers/categories-resolver.service';
import { UsersResolverService } from './resolvers/users-resolver.service';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: [
          EquipmentResolverService,
          CategoriesResolverService,
          UsersResolverService,
        ],
        data: {
          title: 'Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dashboard' },
          ],
        },
      },
      {
        path: 'inventory/equipments',
        component: EquipmentsComponent,
        resolve: [EquipmentResolverService, CategoriesResolverService],
        data: {
          title: 'Equipments',
          urls: [
            { title: 'Equipments', url: '/equipments' },
            { title: 'Equipments' },
          ],
        },
      },
      {
        path: 'equipment-condition',
        component: EquipmentConditionComponent,
        resolve: [EquipmentResolverService, CategoriesResolverService],
        data: {
          title: 'Equipment Condition',
          urls: [
            { title: 'Equipment Condition', url: '/equipment-condition' },
            { title: 'Equipment Condition' },
          ],
        },
      },
      {
        path: 'reports',
        component: ReportsComponent,
        resolve: [EquipmentResolverService],
        data: {
          title: 'Reports',
          urls: [{ title: 'Reports', url: '/reports' }, { title: 'Reports' }],
        },
      },
      {
        path: 'manage-account',
        component: ProfileComponent,
        data: {
          title: 'Manage Account',
          urls: [
            { title: 'Manage Account', url: '/manage-account' },
            { title: 'Manage Account' },
          ],
        },
      },
      {
        path: 'request',
        component: RequestComponent,
        data: {
          title: 'Request',
          urls: [{ title: 'Request', url: '/request' }, { title: 'Request' }],
        },
      },
      {
        path: 'activity-log',
        component: ActivityLogComponent,
        data: {
          title: 'Activity Log',
          urls: [
            { title: 'Activity Log', url: '/activity-log' },
            { title: 'Activity Log' },
          ],
        },
      },
      {
        path: 'about-app',
        component: AboutAppComponent,
        data: {
          title: 'About App',
          urls: [
            { title: 'About App', url: '/about-app' },
            { title: 'About App' },
          ],
        },
      },
      {
        path: 'manage-account',
        component: ProfileComponent,
        data: {
          title: 'Manage Account',
          urls: [
            { title: 'Manage Account', url: '/manage-account' },
            { title: 'Manage Account' },
          ],
        },
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        data: {
          title: 'Manage Users',
          urls: [
            { title: 'Manage Users', url: '/manage-users' },
            { title: 'Manage Users' },
          ],
        },
      },
    ],
  },
  // {
  //     path: 'login',
  //     component: LoginComponent,
  // },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },

  {
    path: '**',
    component: ErrorComponent,
  },
];
