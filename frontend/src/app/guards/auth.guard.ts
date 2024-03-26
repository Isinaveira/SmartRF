import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const isLoggedIn = inject(CookieService).check('myCookie'); 
    if (isLoggedIn) {
      return true; 
    } else {
      inject(Router).navigate(['/login']); 
      return false; 
    }
  }

