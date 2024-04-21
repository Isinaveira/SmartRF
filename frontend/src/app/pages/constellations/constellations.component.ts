import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Constellation } from '@/models/constellation.model';
import { ConstellationsService } from '@/services/constellations.service';
import { MapComponent } from '@/components/shared/map/map.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import { ConstellationFormComponent } from '@/components/shared/constellation-form/constellation-form.component';

@Component({
  selector: 'app-constellations',
  standalone: true,
  imports: [NavbarComponent, ConstellationFormComponent, MapComponent, CommonModule],
  templateUrl: './constellations.component.html',
  styleUrl: './constellations.component.css',
})
export class ConstellationsComponent {
  constellations: Constellation[] = [];
  isAdmin: boolean = false;
  showForm: boolean = false;

  constructor(
    private constellationsService: ConstellationsService,
    private constellationsService: ConstellationsService,
    private router: Router,
    private authService: AuthService
  ) {}
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userData = this.authService.getSessionData();
    if (userData === 'admin') {
      this.isAdmin = true;
    if (userData === 'admin') {
      this.isAdmin = true;
    }
    this.constellationsService.getConstellations().subscribe({
      next: (constellations) => {
        this.constellations = constellations;
      },
      error: (err) => {
        console.log(err);
      },
        console.log(err);
      },
    });
  }

  goTo(constellation_id: string) {
    this.router.navigate(['constellations/' + constellation_id]);
  goTo(constellation_id: string) {
    this.router.navigate(['constellations/' + constellation_id]);
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

  getConstellations() {
    this.constellationsService.getConstellations().subscribe({
      next: (constellations) => {
        this.constellations = constellations;
        this.constellations = constellations;
      },
      error: (err) => {
        console.log(err);
      },
    });
        console.log(err);
      },
    });
  }

  deleteConstellation(event: Event, constellation_id: string) {
    event.stopPropagation();
    this.constellationsService.deleteConstellation(constellation_id).subscribe(
      (data) => {
        alert('Constellation ' + constellation_id + ' was removed');
        this.getConstellations();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteConstellation(event: Event, constellation_id: string) {
    event.stopPropagation();
    this.constellationsService.deleteConstellation(constellation_id).subscribe(
      (data) => {
        alert('Constellation ' + constellation_id + ' was removed');
        this.getConstellations();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
