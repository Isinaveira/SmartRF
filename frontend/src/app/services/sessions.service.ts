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

  
}
