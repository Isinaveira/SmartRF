import { Component } from '@angular/core';
import { UsersService } from '@/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { formatDate } from '@angular/common';
import { Console } from 'console';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

  currentDate!: string;
  name!: string;
  dni!: string;

  constructor(private userService : UsersService, private cookieService: CookieService) {

    this.dni = this.cookieService.get('dniCookie');

    const fechaActual = new Date();


    this.currentDate = formatDate(fechaActual, 'dd/MM/yyyy', 'es-ES');
    this.userService.getUser(this.dni).subscribe({
      next: (data) => { 
        console.log(data);
        this.name = data.name;
       
      }
});
    

  }


  

}
