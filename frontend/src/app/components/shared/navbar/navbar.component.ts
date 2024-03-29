import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ThemeService } from '@/services/theme.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAdmin: boolean = false;

 

  constructor(public themeService: ThemeService, private cookieService: CookieService, private router: Router, private authService: AuthService) {}

 
  ngOnInit() {
    // Verificar si el usuario es administrador al inicializar el componente
    const userData = this.authService.getSessionData();
    if(userData === 'admin'){
    this.isAdmin =  true;
    }
  }

   // Función para mostrar el mensaje de "About"
   showAboutMessage() {
    alert('Repositorio del proyecto: https://github.com/Isinaveira/SmartRF');

  }
  

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    // Borrar la cookie de sesión
    this.cookieService.delete('myCookie');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}

