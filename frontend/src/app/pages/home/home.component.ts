import { Component } from '@angular/core';
import { UsersComponent } from '../users/users.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { ThemeService } from '@/services/theme.service';
import { MapComponent } from '@/components/shared/map/map.component';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersComponent,RouterOutlet,NavbarComponent,CommonModule,MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {

  constructor(public themeService: ThemeService) {}
  


}
