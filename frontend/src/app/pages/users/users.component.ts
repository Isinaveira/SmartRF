import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@/services/theme.service';
import { DataService } from '@/services/data.service';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { User } from '@/models/user.model';



//Falta el modelo de usuario



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {

  users: User[] = [];
    
  

  constructor(public themeService: ThemeService, public dataService: DataService) {}
  
  ngOnInit(){
    this.users = this.dataService.users;
  }
  
  
}
