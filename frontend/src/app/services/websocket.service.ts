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
  public dataForLineChart$: BehaviorSubject<{ name: string, series: any[] }[]> = new BehaviorSubject<{ name: string, series: any[] }[]>([]);
  public mqttMessages: any[] = [];

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

  getMessageUpdates(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('mqtt_message', (data: any) => {
        this.handleMessage(data);
        observer.next(this.dataForLineChart$.getValue());
      });
    });
  }

  handleMessage(d: any): void {
    const data = JSON.parse(d.message);
    let information = data.payload;
    information.results = JSON.parse(information.results);
    this.mqttMessages.push(information);
    let nChannels = information.results.length;
    const newDataForLineChart = this.dataForLineChart$.getValue(); // Obtenemos una copia actual de los datos

    if (newDataForLineChart.length === 0) {
      for (let i = 0; i < nChannels; i++) {
        newDataForLineChart.push({
          name: `channel ${i + 1}`,
          series: [],
        });
      }
    }
    
    for (let i = 0; i < nChannels; i++) {
      if(newDataForLineChart[i].series.length > 10){
        newDataForLineChart[i].series.shift()
      }
      newDataForLineChart[i].series.push({
        name: new Date(information.date),
        value: information.results[i], //probar con el spread operator [...this.samplesPerChannel[i].series.value, this.mqttMessages[i].results[i]];
      });
    }

    this.dataForLineChart$.next(newDataForLineChart); // Emitimos los nuevos datos actualizados
  }

  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }
}
