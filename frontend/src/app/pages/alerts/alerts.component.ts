// alerts.component.ts
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@/services/websocket.service';
import { ToastrService} from 'ngx-toastr'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Alerts } from '@/models/alerts.model';
import { AlertsService } from '@/services/alerts.service';


@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NavbarComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  mqttMessages: any[] = []; // Array to store all MQTT messages
  maxMessages = 9;
  messageObject!: 'hola';
  alertsForm!: FormGroup;
  alerts: Alerts[] = [];

  constructor(private fb: FormBuilder, private websocketService: WebsocketService, private toastS: ToastrService, private alertsService : AlertsService) {

    this.alertsForm = this.fb.group({
      name: ['', Validators.required], 
      station_id: ['', Validators.required],
      type_alert: ['', Validators.required],
      channel_number: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.getAlerts();
  
    
    
    this.websocketService.getMessageUpdates().subscribe(data => {
      console.log('Received MQTT message:', data);
   

      if (this.mqttMessages.length === this.maxMessages) {
        // Remove the oldest message if the limit is reached
        this.mqttMessages.shift();
      }

      // Add the received message to the array
      this.mqttMessages.push(data);


      //Manejo de alertas
   
      const dataSample = JSON.parse(data.message);
      if (this.alerts.length > 0) {
  
        for (const alerta of this.alerts) {

          if (dataSample.id_device === alerta.station_id) {

            if (alerta.type_alert === 'busy') {
            

              const channelNumber = alerta.channel_number;
              const sampleValue = dataSample.results[channelNumber];

              if (sampleValue === 1) {
                this.toastS.warning(`Message: ${JSON.stringify(dataSample)}`, 'Busy');
              }
            } else if(alerta.type_alert === 'free'){

                const channelNumber = alerta.channel_number;
                const sampleValue = dataSample.sample[channelNumber];
  
                if (sampleValue === 0) {

                  this.toastS.success(`Message: ${JSON.stringify(dataSample)}`, 'Free');
                }      
            }
          }
        }
      }
    });
  }




  onSubmit() {
  
    const ALERT: Alerts = {
      name: this.alertsForm.get('name')?.value,
      station_id: this.alertsForm.get('station_id')?.value,
      type_alert: this.alertsForm.get('type_alert')?.value,
      channel_number: this.alertsForm.get('channel_number')?.value,

      };
          this.alertsService.saveAlert(ALERT).subscribe({
            next: (data) => {
              console.log(ALERT);
              location.reload();
            },
            error: (error) => {
              console.log(error);
              this.alertsForm.reset();
            }
          });
  
    }


    getAlerts(){

      this.alertsService.getAlerts().subscribe({
        next: (alerts) => {
          this.alerts = alerts
        },
        error: (err) => {
          console.log(err)
        }
      })

    }

    deleteAlert(Alert: Alerts) {

      this.alertsService.deleteAlert(Alert.name).subscribe(data => {
    
        alert('Alert ' + Alert.name + ' was removed');
        location.reload();
      }, error => {
        console.log(error)
      })
    }
  }