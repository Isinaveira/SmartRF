import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alerts } from '@/models/alerts.model';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {



  url: string = "http://localhost:3000/alerts"

  constructor(private http: HttpClient) { }


  saveAlert(alerts: Alerts): Observable<any> {
    return this.http.post(this.url, alerts);
  }
  

  getAlerts(): Observable<any> {
    return this.http.get(this.url);
  }


  // Metodo para borrar usuarios
  deleteAlert(name: string): Observable<any> {
    return this.http.delete(this.url+ "/" + name);
  }
}
