import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import { WebsocketService } from '@/services/websocket.service';
import { AlertsService } from '@/services/alerts.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAdmin: boolean = false;
  alertsStatus: string= "notifications_off";
 

  constructor(private alertsService: AlertsService, private webSocketService: WebsocketService,private cookieService: CookieService, private router: Router, private authService: AuthService) {}

 
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
  

  alerts(){
    this.alertsService.activateAlerts();
    console.log(this.alertsService.isActivated);
    this.alertsStatus= (this.alertsService.isActivated)? "notifications_active":"notifications_off";
  }

  logout() {
    // Borrar la cookie de sesión
    this.cookieService.delete('myCookie');

    //Cerrar el socket
    this.webSocketService.disconnect();
    console.log('WebSocket closed');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}

