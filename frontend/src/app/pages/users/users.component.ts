import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@/services/theme.service';
import { DataService } from '@/services/data.service';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { User } from '@/models/user.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from '@/utils/validation';
import { UserService } from '@/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';




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
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    dni: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    department: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  dni: string | null;
  
  

  constructor(public themeService: ThemeService, public dataService: DataService, public userservice: UserService, private aRouter: ActivatedRoute, private fb: FormBuilder, public router: Router) {

   

    this.dni = this.aRouter.snapshot.paramMap.get('dni');
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  
  // ngOnInit(){
  //   this.users = this.dataService.users;
  // }


  // // Anadir un usuario
  // addUser() {
  //   const USER: User = {
  //     name: this.userForm.get('name')?.value,
  //     dni: this.userForm.get('dni')?.value,
  //     email: this.userForm.get('email')?.value,
  //     role: this.userForm.get('role')?.value,
  //     department: this.userForm.get('department')?.value,
  //     password: this.userForm.get('password')?.value,
  //   };
  //   // Verificar existe el usuario
  //   if (this.dni !== null) {
  //     // existe el usuario se edita
  //     this.userservice.editUser(this.dni, USER).subscribe(
  //       (data) => {
  //         this.router.navigate(['/users/']);
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.userForm.reset();
  //       }
  //     );
  //   } else {
  //     // no existe el usuario se crea
  //     console.log(USER);
  //     this.userservice.saveUser(USER).subscribe(
  //       (data) => {
  //         this.router.navigate(['/users/']);
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.userForm.reset();
  //       }
  //     );
  //   }
  // }
  
  
}
