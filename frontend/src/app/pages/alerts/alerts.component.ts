// alerts.component.ts
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@/services/websocket.service';
@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  mqttMessages: any[] = []; // Array to store all MQTT messages
  maxMessages = 9;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.getMessageUpdates().subscribe(data => {
      console.log('Received MQTT message:', data);

      if (this.mqttMessages.length === this.maxMessages) {
        // Remove the oldest message if the limit is reached
        this.mqttMessages.shift();
      }

      // Add the received message to the array
      this.mqttMessages.push(data);
    });
  }
}