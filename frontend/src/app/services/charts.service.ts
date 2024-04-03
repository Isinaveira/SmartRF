import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { chartTune } from '@/models/chartTune.model';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {



  url = "http://localhost:3000/charts"
  constructor(private http: HttpClient) { }



  getChartsMeasuresByDate(startDate: Date, finishDate: Date): Observable<any> {
    return this.http.get(this.url + "/" + startDate + "/" + finishDate);
  }
}
