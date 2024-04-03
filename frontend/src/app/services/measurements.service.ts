import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Measurement } from '@/models/measurement.model';



@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  measurements!: Measurement[];
  url: string = "http://localhost:3000/measurements"
  constructor(private http: HttpClient) { }

  //iniciar medición
  startMeasurement(measurement: Measurement): Observable<any> {
    return this.http.post(this.url, measurement);
  }
  //para medición
  stopMeasurement(){};
  //obtener mediciones
  getMeasurements(){};
  //realizar cálculos
  calculateResults(){};
}
