import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@/services/users.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [CookieService],
})
export class LoginComponent {

  loginForm: FormGroup;
  usernameUPPER : String = '';
  

  constructor(private router: Router, public usersService: UsersService, private formBuilder: FormBuilder, private cookieService: CookieService){


    
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(9)]],
      password: ['', Validators.required],
    });
    
  }


  checkLogin() {
    const dni = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
  
    if (dni && password) {
      this.usersService.checkUser(dni, password).subscribe({
        next: (data: any) => {
          if (data.success === true) {


            this.usersService.getUser(dni).subscribe({
              next: (userData: any) => {
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (15 * 60 * 1000)); // 15 minutos
                this.cookieService.set('myCookie', userData.role, expirationDate);

                console.log(this.cookieService.get('myCookie'))
                // alert('Successful Login!');
                this.router.navigate(['/home']);

              },
              error: (error) => {

                console.log(error);
                alert('An error occurred while fetching user data');
                this.loginForm.reset();

              }
            });

          } else if (data.success === false) {
            alert('Incorrect password');
            this.loginForm.reset();
          } else {
            alert('User is not registered');
            this.loginForm.reset();
          }
        },
        error: (error) => {
          console.log(error);
          alert('An error occurred');
          this.loginForm.reset();
        }
      });
    } else {
      // Handle the case where username or password is undefined or null
      console.error('Username or password is not provided');
    }
  }
  resetForm() {
    this.loginForm.reset();
  }

}