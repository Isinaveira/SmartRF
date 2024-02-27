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


  constructor(public themeService: ThemeService) {}
  // formulario: FormGroup;

  // constructor(private fb: FormBuilder, public dataService: DataService) {

  //   this.formulario = this.fb.group({
  //     nombre: ['', Validators.required],
  //     apellidos: ['', Validators.required],
  //     dni: ['', Validators.required],
  //     empresa: ['', Validators.required]
  //   });
  //  }

  // ngOnInit() {
   
  // }

  // onSubmit() {
    
  // }


  
}
