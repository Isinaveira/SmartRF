import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartRF';

  isLogin: boolean = false;
  constructor(
    private cookieService: CookieService
  ){}

  ngOnInit(){
    const isLoggedIn = this.cookieService.check('myCookie');
    this.isLogin = isLoggedIn;
  }
}
