import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private cookieService: CookieService) { }

  getSessionData(): any {
    const role = this.cookieService.get('myCookie');
    if (role) {
      // Devolver el valor de 'role' almacenado en la cookie
      return role;
    } else {
      return null;
    }
  }
}
