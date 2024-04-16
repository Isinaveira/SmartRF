// websocket.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;
  public isConnected: boolean = false;
  public received_messages: any[]=[];

  constructor() {
    // // Replace 'http://localhost:3000' with your backend server URL
    // this.socket = io('http://localhost:4000');
  }

  public connect(): void {
    if (!this.isConnected) {
      // Reemplaza 'http://localhost:4000' con la URL de tu servidor WebSocket
      this.socket = io('http://localhost:4000');
      this.isConnected = true;
    }
  }

  getMessageUpdates(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('mqtt_message', (data: any) => {
        observer.next(data);
      });
    });
  }
  

  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
      this.isConnected=false;
    }
  }
}
