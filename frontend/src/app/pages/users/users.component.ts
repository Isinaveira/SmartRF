import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/services/theme.service';
import { DataService } from 'src/services/data.service';
import { NavbarComponent } from 'src/app/components/shared/navbar/navbar.component';



//Falta el modelo de usuario



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {

  
    users = [
      {
        "name": "John Doe",
        "username": "john_doe",
        "email": "john.doe@example.com",
        "role": "usuario",
        "company":"Televés"
      },
      {
        "name": "Jane Smith",
        "username": "jane_smith",
        "email": "jane.smith@example.com",
        "role": "admin",
        "company":"Televés"
      },
      {
        "name": "Alice Johnson",
        "username": "alice_johnson",
        "email": "alice.johnson@example.com",
        "role": "usuario",
        "company":"Gradiant"
      },
      {
        "name": "Robert Brown",
        "username": "robert_brown",
        "email": "robert.brown@example.com",
        "role": "admin",
        "company":"Gradiant"
      },
      {
        "name": "Emily Clark",
        "username": "emily_clark",
        "email": "emily.clark@example.com",
        "role": "usuario",
        "company":"Surcontrol"
      },
      {
        "name": "David Smith",
        "username": "david_smith",
        "email": "david.smith@example.com",
        "role": "usuario",
        "company":"Surcontrol"
      },
      {
        "name": "Sophia Wilson",
        "username": "sophia_wilson",
        "email": "sophia.wilson@example.com",
        "role": "admin",
        "company":"Surcontrol"
      },
      {
        "name": "Michael Johnson",
        "username": "michael_johnson",
        "email": "michael.johnson@example.com",
        "role": "usuario",
        "company":"Televés"
      },
      {
        "name": "Olivia Martin",
        "username": "olivia_martin",
        "email": "olivia.martin@example.com",
        "role": "usuario",
        "company":"Televés"
      },
      {
        "name": "James Davis",
        "username": "james_davis",
        "email": "james.davis@example.com",
        "role": "admin",
        "company":"Televés"
      }
    ]
  
  
  

  constructor(public themeService: ThemeService) {}
  
  
  
}
