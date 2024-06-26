import { Component } from '@angular/core';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { PdfCreatorService } from '@/services/pdf-creator.service';
import { MeasurementsService } from '@/services/measurements.service';
import { Measurement } from '@/models/measurement.model';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { SessionsService } from '@/services/sessions.service';
import { Session } from '@/models/session.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'], // Corrected from styleUrl to styleUrls
})
export class WorkspaceComponent {
  constructor(
    private pdfCreator: PdfCreatorService,
    private measurementService: MeasurementsService,
    private cookieService: CookieService,
    private sessionsService: SessionsService,
    private router: Router
  ) {}

  workspaces = [
    {
      id: '1',
      name: 'All sessions',
      description: 'See all sessions of all users',
    },
    { id: '2', name: 'my sessions', description: 'See your own sessions' },
  ];
  measurements: Measurement[] = [];
  allMeasurements: Measurement[] = [];
  myMeasurement: Partial<Measurement> = {};
  sessions: Session[] = [];

  dni!: string;
  filters = {
    constellation: (m: any) => m.type.isConstellation == true,
    devices: (m: any) => m.type.isConstellation == false,
    personal: (m: any) => m.dni_user == this.dni,
  };

  ngOnInit() {
    this.dni = this.cookieService.get('dniCookie');

    this.measurementService.getMeasurements().subscribe({
      next: (measurements) => {
        this.allMeasurements = measurements;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMeasurementsByFilter(filter: any) {
    return this.allMeasurements.filter(filter);
  }

  generateReport() {
    this.pdfCreator.generateReport(
      this.myMeasurement as Measurement,
      this.sessions,
      () => {
        console.log('Report generation completed!');
      }
    );
  }

  toggleFilterMeasurementsLists(option: String) {
    if (Object.keys(this.myMeasurement).length != 0) {
      this.myMeasurement = {};
    }
    if (option == 'constellations') {
      this.measurements = this.getMeasurementsByFilter(
        this.filters.constellation
      );
    } else if (option == 'devices') {
      this.measurements = this.getMeasurementsByFilter(this.filters.devices);
    } else if (option == 'personal') {
      this.measurements = this.getMeasurementsByFilter(this.filters.personal);
    } else {
      this.measurements = this.allMeasurements;
    }
  }

  showDetail(myMeasurement: Measurement) {
    this.myMeasurement = { ...myMeasurement };
    this.sessionsService
      .getSamplesMeasurement(this.myMeasurement?._id)
      .subscribe({
        next: (sessions) => {
          this.sessions = sessions;
          console.log(this.sessions);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  objectKeys(o: Object): string[] {
    return Object.keys(o);
  }

  goTo(id: string) {
    this.router.navigate(['workspaces/' + id]);
  }
}
