import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@/services/theme.service';
import { DataService } from '@/services/data.service';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { User } from '@/models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '@/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';




//Falta el modelo de usuario

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {

  users: User[] = [];
  userForm : FormGroup;
  dni: string | null;
  
  

  constructor(public themeService: ThemeService, public dataService: DataService, public usersService: UsersService, private aRouter: ActivatedRoute, private fb: FormBuilder, public router: Router) {

   
    this.userForm = this.fb.group({

      name: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      password: ['', Validators.required],


    });

    this.dni = this.aRouter.snapshot.paramMap.get('dni');
  }


  
  ngOnInit(){
    this.users = this.dataService.users;
  }


  // Anadir un usuario
  addUser() {
    const USER: User = {
      name: this.userForm.get('name')?.value,
      dni: this.userForm.get('dni')?.value,
      email: this.userForm.get('email')?.value,
      role: this.userForm.get('role')?.value,
      department: this.userForm.get('department')?.value,
      password: this.userForm.get('password')?.value,
    };
    // Verificar existe el usuario
    if (this.dni !== null) {
      // existe el usuario se edita
      this.usersService.editUser(this.dni, USER).subscribe({
         next:  (data) => {
          this.router.navigate(['/users/']);
        },
        
        error:  (error) => {
          console.log(error);
          this.userForm.reset();
        }
    });
    } else {
      // no existe el usuario se crea
      console.log(USER);
      this.usersService.saveUser(USER).subscribe({
        next :  (data) => { 
          this.router.navigate(['/users/']);
        },

       error: (error) => {
          console.log(error);
          this.userForm.reset();
        }
    });
    }
  }
  
  
}
