import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'dashboard-user',
    loadComponent: () => import('./pages/dashboard-user/dashboard-user.page').then((m) => m.DashboardUserPage),
    canActivate: [authGuard, roleGuard(['user', 'admin'])],
  },
  {
    path: 'dashboard-admin',
    loadComponent: () => import('./pages/dashboard-admin/dashboard-admin.page').then((m) => m.DashboardAdminPage),
    canActivate: [authGuard, roleGuard(['admin'])],
  },
  {
    path: 'home',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
