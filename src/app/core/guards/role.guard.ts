import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      router.navigate(['/login']);
      return false;
    }

    if (allowedRoles.includes(currentUser.role)) {
      return true;
    }

    // Si no tiene el rol necesario, redirigir al dashboard apropiado
    if (currentUser.role === 'admin') {
      router.navigate(['/dashboard-admin']);
    } else {
      router.navigate(['/dashboard-user']);
    }
    return false;
  };
};
