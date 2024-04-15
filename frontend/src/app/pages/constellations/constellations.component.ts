import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Constellation } from '@/models/constellation.model';
import { ConstellationsService } from '@/services/constellations.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import moment from 'moment';
import { ConstellationFormComponent } from '@/components/shared/constellation-form/constellation-form.component';


@Component({
  selector: 'app-constellations',
  standalone: true,
  imports: [NavbarComponent, ConstellationFormComponent],
  templateUrl: './constellations.component.html',
  styleUrl: './constellations.component.css'
})
export class ConstellationsComponent implements OnInit {
  
  constellations: Constellation[] = [];
  isAdmin: boolean = false;
  showForm: boolean = false;

  constructor(
    private constellationsService: ConstellationsService, 
    private router: Router,
    private authService: AuthService,
 
  ){}

  ngOnInit(): void {

    const userData = this.authService.getSessionData();
    if(userData === 'admin'){
    this.isAdmin =  true;
    }
    this.constellationsService.getConstellations().subscribe({
      next: (constellations) => {
        this.constellations = constellations;
        console.log(constellations);
        constellations.forEach((element:any) => {
          console.log(element.devices_list.length);
        });
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  generateTime(date: string): string {
    // Lógica para formatear la fecha
    return moment(date).format('DD/MM/YYYY');
  }
  goTo(constellation_id: string){
    this.router.navigate(['constellations/'+constellation_id])
  }

  // openCreateConstellationFormDialog(): void {
  //   this.dialog.open(ConstellationFormComponent, {
  //     backdropClass: 'modal-backdrop',
  //     panelClass: 'modal-panel'
  //   });
  // }

  toggleConstellationForm(): void {
    this.showForm = !this.showForm;
  }

  deleteConstellation(constellation_id: string) {

    
    this.constellationsService.deleteConstellation(constellation_id).subscribe(data => {

      alert('Constellation ' + constellation_id + ' was removed');
      location.reload();
    }, error => {
      console.log(error)
    })



  }


}
