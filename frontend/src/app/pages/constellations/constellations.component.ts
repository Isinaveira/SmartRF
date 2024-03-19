import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Constellation } from '@/models/constellation.model';
import { ConstellationsService } from '@/services/constellations.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private constellationsService: ConstellationsService, 
    private router: Router
  ){}

  ngOnInit(): void {
      this.constellations = this.constellationsService.constellations;
  }

  getDevicesOfConstellation( id_constellation: string){
    let devices_list = this.constellations
                           .filter( c => (c._id == id_constellation))[0].devices_list

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
