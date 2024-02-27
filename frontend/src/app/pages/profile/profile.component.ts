import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, RouterLink,NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
