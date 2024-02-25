import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../../services/data.service';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';



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
