import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PredefinedMeasurementsService {
  

  url = "http://localhost:3000/predefinedMeasurements"
  constructor(private http: HttpClient) { }



  getPredefinedMeasurements(): Observable<any> {
    return this.http.get(this.url);
  }

  getPredefineMeasurement(name: string): Observable<any>{

    return this.http.get(this.url + "/" + name)
  }
}
