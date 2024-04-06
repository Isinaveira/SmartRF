import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Constellation } from '@/models/constellation.model';
import { ConstellationsService } from '@/services/constellations.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import moment from 'moment';

@Component({
  selector: 'app-constellations',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './constellations.component.html',
  styleUrl: './constellations.component.css'
})
export class ConstellationsComponent implements OnInit {
  
  constellations: Constellation[] = [];
  isAdmin: boolean = false;

  constructor(
    private constellationsService: ConstellationsService, 
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {

    const userData = this.authService.getSessionData();
    if(userData === 'admin'){
    this.isAdmin =  true;
    }
      this.constellations = this.constellationsService.constellations;
  }

  getNumberOfDevicesInConstellation(id_constellation:string){
    return this.constellations
               .filter(c => (c._id == id_constellation))[0].devices_list.length
  }

  generateTime(date: string): string {
    // Lógica para formatear la fecha
    return moment(date).format('DD/MM/YYYY');
  }
  goTo(constellation_id: string){
    this.router.navigate(['constellations/'+constellation_id])
  }
}
