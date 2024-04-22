import { Component } from '@angular/core';
import { ReportComponent } from './report/report.component';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { PdfCreatorService } from '@/services/pdf-creator.service';
import { MeasurementsService } from '@/services/measurements.service';
import { Measurement } from '@/models/measurement.model';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { SessionsService } from '@/services/sessions.service';


@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [ReportComponent, NavbarComponent, CommonModule],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'], // Corrected from styleUrl to styleUrls
})
export class WorkspaceComponent {
  constructor(
    private pdfCreator: PdfCreatorService,
    private measurementService: MeasurementsService,
    private cookieService: CookieService,
    private sessionsService: SessionsService
    ) {}


  measurements: Measurement[]=[];
  allMeasurements: Measurement[]=[];
  myMeasurement = {};


  dni!: string;
  filters = {
    constellation: (m: any) => (m.type.isConstellation == true),
    devices: (m: any) => (m.type.isConstellation == false),
    personal: (m: any) => (m.dni_user == this.dni)    
  };



  ngOnInit(){

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

  getMeasurementsByFilter(filter: any){

    return this.allMeasurements.filter(filter);

  }
  
  generateReport() {
    this.pdfCreator.generateReport(() => {
      console.log('Report generation completed!');
    });
  }



toggleFilterMeasurementsLists(option: String){
  
  if(Object.keys(this.myMeasurement).length != 0){
    this.myMeasurement={};
  }
  if(option == "constellations"){
    this.measurements = this.getMeasurementsByFilter(this.filters.constellation);
  } 
  else if(option == "devices"){
    this.measurements = this.getMeasurementsByFilter(this.filters.devices);
  } 
  else if( option == "personal"){
    this.measurements = this.getMeasurementsByFilter(this.filters.personal);

  } else{
    this.measurements = this.allMeasurements;
  }



}


showDetail(myMeasurement: Measurement){

  this.myMeasurement = {...myMeasurement };
  //this.sessionsService.getSamplesMeasurement(this.myMeasurement._id);


}

objectKeys(o : Object): string[] {

  return Object.keys(o);
}



  


}