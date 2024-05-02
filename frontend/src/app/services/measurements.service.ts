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
  startMeasurement(data: any): Observable<any> {
    return this.http.post(`${this.url}/start`,data);
  }
  //para medición
  stopMeasurement(data:any): Observable<any>{

    return this.http.post(`${this.url}/stop`,data);
  }
  //obtener mediciones
  getMeasurementByName(name: string): Observable<any> {
    return this.http.get(`${this.url}/${name}`);
  }
  
  getMeasurements(): Observable<any> {
    return this.http.get(this.url);
  }

  getMyMeasurements(dni_user: string): Observable<any> {
    return this.http.get(this.url + "/dni/"+ dni_user);
  }

  getMeasurementById(measurement_id: string): Observable<any>{
    return this.http.get(this.url + "/measurement/" + measurement_id);
  }
  // getMyMeasurements(dni_user: string): Observable<any> {
  //   return this.http.get(`${this.url}/dni/${dni_user}`);
  // }
}
