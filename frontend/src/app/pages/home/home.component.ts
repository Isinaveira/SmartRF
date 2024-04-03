import { Component } from '@angular/core';
import { UsersComponent } from '../users/users.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { ThemeService } from '@/services/theme.service';
import { MapComponent } from '@/components/shared/map/map.component';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersComponent,RouterOutlet,NavbarComponent,CommonModule,MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {


  isAdmin: boolean = false;

  routes = {
    devices : 'devices',
    users: 'users',
    alerts: 'alerts',
    constellations: 'constellations',
    charts: 'charts'
  }

  constructor(public themeService: ThemeService, public router: Router, private authService: AuthService) {}
  
  ngOnInit() {
    // Verificar si el usuario es administrador al inicializar el componente
    const userData = this.authService.getSessionData();
    if(userData === 'admin'){
    this.isAdmin =  true;
    }
  }
  goTo(url: string){
    this.router.navigate([url]);
  }
}
