import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;
  public isConnected: boolean = false;
  public received_messages: any[] = [];
  public dataForLineChart$: BehaviorSubject<{[id: string]:{ name: string, series: any[] }[]}> = new BehaviorSubject<{[id: string]:{ name: string, series: any[] }[]}>({});
  public data: { [id: string]: { name: string, series: any[] }[] } = {};
  public threshold : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private MAX_SAMPLES_REAL_TIME = 20;



  constructor() {
    // // Replace 'http://localhost:3000' with your backend server URL
    // this.socket = io('http://localhost:4000');
  }

  public connect(): void {
    if (!this.isConnected) {
      // Replace 'http://localhost:4000' with the URL of your WebSocket server
      this.socket = io('http://localhost:4000');
      this.isConnected = true;
    }
  }

  getMessageUpdates(option: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on('mqtt_message', (data: any) => {
        if(option == 'charts') {
        this.handleMessage(data);
        observer.next(this.dataForLineChart$.getValue());
        } else {
          observer.next(data);
        }
      });
    });
  }

  getData(): Observable<any>{
    return new Observable(observer => {
      observer.next(this.dataForLineChart$.getValue());
    })
  }

  handleMessage(d: any): void {
    const message = JSON.parse(d.message);
    const information = message.payload;
    this.threshold.next(information.threshold);
    const deviceId = information.id_device;
    information.results = JSON.parse(information.results);
    const nChannels = information.results.length;
    // Verifica si ya hay datos para este dispositivo, si no, inicializa un array vacío
    if (!this.data[deviceId]) {
      this.data[deviceId] = Array.from({ length: nChannels }, (_, index) => ({
        name: `channel ${index + 1}`,
        series: []
      }));
    }

    // Maneja los datos para este dispositivo
    const results = information.results;
    results.forEach((result: any, index: number) => {
      const newDataPoint = {
        name: new Date(information.date),
        value: result
      };

      
      if(this.data[deviceId][index].series.length == this.MAX_SAMPLES_REAL_TIME){
        this.data[deviceId][index].series.shift();
      }
      this.data[deviceId][index].series.push(newDataPoint);
    });

    this.dataForLineChart$.next(this.data);
  }

  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }
}