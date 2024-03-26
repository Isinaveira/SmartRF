import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Measurement } from '@/models/measurement.model';



@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  measurements!: Measurement[];

  constructor(private http: HttpClient) { }

  //iniciar medición
  startMeasurement(){

  };
  //para medición
  stopMeasurement(){};
  //obtener mediciones
  getMeasurements(){};
  //realizar cálculos
  calculateResults(){};
}
