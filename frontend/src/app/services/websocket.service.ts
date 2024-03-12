// websocket.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;

  constructor() {
    // Replace 'http://localhost:3000' with your backend server URL
    this.socket = io('http://localhost:4000');
  }

  getMessageUpdates(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('mqtt_message', (data: any) => {
        observer.next(data);
      });
    });
  }
}
