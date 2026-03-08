import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Loginservice } from '../login/loginservice';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const loginService = inject(Loginservice);

  return loginService.iniciosesion().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};