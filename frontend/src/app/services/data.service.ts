import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();
  
  constructor() { }

  changeMeasurementState(message: boolean) {
    this.messageSource.next(message);
  }
}
