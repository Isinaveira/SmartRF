import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  url = 'http://localhost:3000/sessions';
  constructor(private http: HttpClient) {}

  getSessionOfDevice(deviceID: string): Observable<any> {
    return this.http.get(this.url + '/' + deviceID);
  }
  getSamplesMeasurement(measurement_id: string | undefined): Observable<any> {
    if (!measurement_id) {
      // Handle undefined ID appropriately
      throw new Error('Measurement ID is required');
      // Or return an empty Observable, etc.
    }
    return this.http.get(this.url + '/samples/' + measurement_id);
  }
}
