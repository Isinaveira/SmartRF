import { ChartsComponent } from '@/components/shared/charts/charts.component';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Measurement } from '@/models/measurement.model';
import { DataService } from '@/services/data.service';
import { MeasurementsService } from '@/services/measurements.service';
import { PdfCreatorService } from '@/services/pdf-creator.service';
import { SessionsService } from '@/services/sessions.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-measurement-detail',
  standalone: true,
  imports: [CommonModule, ChartsComponent, NavbarComponent],
  templateUrl: './measurement-detail.component.html',
  styleUrl: './measurement-detail.component.css'
})
export class MeasurementDetailComponent {
  measurement! : any;
  samples!: any[];
  device_id!: string;
  totalOfSamples!: number;
  constructor( 
    private measurementsService: MeasurementsService,
    private sessionsService: SessionsService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private pdfCreatorService: PdfCreatorService
  ){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.measurementsService.getMeasurementById(id).subscribe( m => {
          this.measurement = m;
          this.device_id = this.measurement.type.id;
          this.sessionsService.getSamplesMeasurement(id).subscribe( samples => {
            this.samples = samples;
            this.totalOfSamples = this.samples.length;
            this.dataService.changeChartSamplesData(this.samples);
          });
        });
      }
    });
  }

  generateReport(){
    this.pdfCreatorService.generateReport(this.measurement, this.samples, ()=>{});
  }

  
}
