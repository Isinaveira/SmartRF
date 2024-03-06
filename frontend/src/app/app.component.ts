import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersComponent } from '@/pages/users/users.component';
import { HomeComponent } from '@/pages/home/home.component';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, HomeComponent, NavbarComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
