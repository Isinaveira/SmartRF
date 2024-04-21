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
  styleUrl: './report.component.css',
})
export class ReportComponent {
  currentDate!: string;
  name!: string;
  dni!: string;

  constructor(
    private userService: UsersService,
    private cookieService: CookieService
  ) {
    this.dni = this.cookieService.get('dniCookie');

    const fechaActual = new Date();

    this.currentDate = fechaActual.toLocaleString('es-Es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Usar formato de 24 horas
    });
    this.userService.getUser(this.dni).subscribe({
      next: (data) => {
        console.log(data);
        this.name = data.name;
      },
    });
  }
}
