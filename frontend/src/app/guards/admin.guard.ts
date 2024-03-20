import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';


export const adminGuard: CanActivateFn = (route, state) => {
  
  const userData = inject(AuthService).getSessionData();
  if(userData === 'admin'){
    return true;
  } else{
    inject(Router).navigate(['/home']);
    return false;
  }
};
