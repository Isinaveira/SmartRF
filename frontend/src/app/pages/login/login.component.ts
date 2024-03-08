import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@/services/users.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private router: Router, public usersService: UsersService, private fb : FormBuilder){

    this.loginForm = this.fb.group({

      dni: ['', Validators.required],
      password: ['', Validators.required],


    });
  }

  // checkLogin() {
  //   // Verificar existe el usuario
  //     let userL=  this.usersService.getUser(this.loginForm.value.dni).subscribe({
  //     next: (data) => {
  //       // Si encontramos un usuario con el mismo DNI reseteamos el formulario
  //       console.log('User is registered:', userL);
       
  
  //       // Check if the DNI matches the password in the database
  //       if (data.password === this.loginForm.value.password) {
  //         alert('Successful Login!');
  //         this.router.navigate(['/home']);
  //       } else {
  //         alert('Incorrect password');
  //         this.loginForm.reset();
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //       alert('User is not registered');
  //       this.loginForm.reset();
  //     }
  //   });
  // }

  checkLogin() {
    // Verificar existe el usuario
    const dni = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.usersService.getUser(dni).subscribe({
      next: (data) => {
        // Si encontramos un usuario con el mismo DNI reseteamos el formulario
        console.log('User data:', data);
  
        // Check if the DNI matches the password in the database
        if (data.password === password) {
          alert('Successful Login!');
          this.router.navigate(['/home']);
        } else {
          alert('Incorrect password');
          this.loginForm.reset();
        }
      },
      error: (error) => {
        console.log(error);
        alert('User is not registered');
        this.loginForm.reset();
      }
    });
  }
}