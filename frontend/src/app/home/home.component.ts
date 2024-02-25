import { Component } from '@angular/core';
import { UsersComponent } from '../users/users.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersComponent,RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {

  constructor(public themeService: ThemeService) {}


}
