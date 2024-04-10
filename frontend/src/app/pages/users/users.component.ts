import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { User } from '@/models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '@/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';





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
  isEditing = false;
  userdniUPPER: string = '';
  
  constructor(
    public usersService: UsersService, 
    private aRouter: ActivatedRoute, 
    private fb: FormBuilder, 
    public router: Router
  ) {

   
    this.userForm = this.fb.group({

      name: ['', Validators.required],
      dni: ['',[Validators.required, Validators.maxLength(9)]],
      email: ['', Validators.required, Validators.email],
      role: ['user', Validators.required],
      department: ['', Validators.required],
      password: ['', Validators.required],


    });

    this.dni = this.aRouter.snapshot.paramMap.get('dni');
  }


  
  ngOnInit(){

    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      },
      error: (err) => {
        console.log(err)
      }
    })
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


      if(this.isEditing){

        this.usersService.editUser(this.userForm.value.dni,USER).subscribe({

          next: (data) => {

            location.reload();
          },

          error: (error) => {
            console.log(error);
            this.userForm.reset();
          }
        })



      } else {

// Verificar existe el usuario

    this.usersService.getUser(this.userForm.value.dni).subscribe({
      next: (data) => {
        // Si encontramos un usuario con el mismo DNI reseteamos el formulario
        console.log('User already exists:', data);
        alert('User with the same DNI already exists.');
        this.userForm.reset();
      },
      error: (error) => {
       // console.log(error);

        // Si no existe en la base de datos lo creamos
        console.log(USER);
        this.usersService.saveUser(USER).subscribe({
          next: (data) => {
            location.reload();
          },
          error: (error) => {
            console.log(error);
            this.userForm.reset();
          }
        });
      }
});
    
}
}

 // Editar campos de un usuario excepto el DNI
editUser(user: User) {

    this.isEditing = true;
    this.usersService.getUser(user.dni).subscribe((data) => {
      this.userForm.setValue({
        name: data.name,
        dni: data.dni,
        email: data.email,
        role: data.role,
        department: data.department,
        password: null,
      });
    });
  

}

  //  Eliminar un usuario y recargar la pagina
deleteUser(user: User) {

  this.usersService.deleteUser(user.dni).subscribe(data => {
    
    alert('User ' + user.name + ' was removed');
    location.reload();
  }, error => {
    console.log(error)
  })
}
  

clearForm(){

  this.isEditing = false;
  this.userForm.reset();



}
  
}
