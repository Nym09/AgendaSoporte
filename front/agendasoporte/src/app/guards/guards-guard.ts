import { CanActivateFn } from '@angular/router';
import { Authservices } from '../auth/service/authservices';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const guardsGuard: CanActivateFn = (route, state) => {
  const authservice = inject(Authservices);
  const router = inject(Router);

  const token = authservice.get_token();

  if (token) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }

};
