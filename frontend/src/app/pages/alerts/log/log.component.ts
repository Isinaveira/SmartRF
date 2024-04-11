import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@/services/websocket.service';
@Component({
  selector: 'app-log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent implements OnInit{

  mqttMessages: any[] = []; // Array to store all MQTT messages

  constructor(

    private websocketService: WebsocketService

  ) { }

  ngOnInit(): void {
    // //Comporbamos si ya hay abierto un socket para no duplicar mensajes
    // if (!this.websocketService.isConnected) {
    //   this.websocketService.connect(); // Conectar al WebSocket si no está conectado


    //   this.websocketService.getMessageUpdates().subscribe(data => {
    //     console.log('Received MQTT message:', data);
    //     this.mqttMessages.push(data);


    //   });
    // }
  }


}
