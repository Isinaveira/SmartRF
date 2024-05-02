import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject(false);
  private dataSource = new BehaviorSubject<any[]>([]);
  currentMessage = this.messageSource.asObservable();
  samplesData= this.dataSource.asObservable();
  
  constructor() { }

  changeMeasurementState(message: boolean) {
    this.messageSource.next(message);
  }
  changeChartSamplesData(samples: any[]){
    this.dataSource.next(samples);
  }
}
