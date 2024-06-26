// alerts.component.ts
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@/services/websocket.service';
import { ToastrModule,ToastrService} from 'ngx-toastr'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Alerts } from '@/models/alerts.model';
import { AlertsService } from '@/services/alerts.service';
import { UsersService } from '@/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NavbarComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  mqttMessages: any[] = []; // Array to store all MQTT messages
  messageObject!: 'hola';
  alertsForm!: FormGroup;
  alerts: Alerts[] = [];
  messageSubscription: Subscription | undefined;
  constructor(
    private fb: FormBuilder, 
    public websocketService: WebsocketService,
    private toastS: ToastrService,
    private alertsService : AlertsService,
    private userService: UsersService,
    private cookieService: CookieService) {  
        
    this.alertsForm = this.fb.group({
      name: ['', Validators.required], 
      station_id: ['', Validators.required],
      type_alert: ['', Validators.required],
      channel_number: ['', Validators.required],

    });
  }

  ngOnInit(): void {

    this.getAlerts();
  
    //Comporbamos si ya hay abierto un socket para no duplicar mensajes
   
     // this.websocketService.connect(); // Conectar al WebSocket si no está conectado
    // if(this.alertsService.isActivated){

    this.alertsService.deactivateAlerts();

    // }
    this.messageSubscription=this.websocketService.getMessageUpdates('alerts').subscribe(data => {
      console.log('Received MQTT message:', data);
      // Add the received message to the array
      //this.mqttMessages.push(data);
      this.websocketService.received_messages.push(data);
      //Manejo de alertas

     

      // const msg = JSON.parse(data);
      // let dataSample = msg.payload;
      // dataSample.results = JSON.parse(msg.results);

      const d = JSON.parse(data.message);
      let information = d.payload;
      information.results = JSON.parse(information.results);
     
      // this.mqttMessages.push(information);
     
      console.log(information.results[2]);
      if (this.alerts.length > 0) {
        console.log(this.alerts.length)
        for (const alerta of this.alerts) {
          console.log(information);
          console.log(information.id_device);
          if (information.id_device == alerta.station_id) {
           
            if (alerta.type_alert === 'busy') {
            

              const channelNumber = alerta.channel_number;
              const sampleValue = information.results[channelNumber-1];

              if (sampleValue > 0) {
                this.toastS.warning(`Message: ${JSON.stringify(information)}`, 'Busy',{ "positionClass" : "toast-bottom-left"});
              }
            } else if(alerta.type_alert === 'free'){

                const channelNumber = alerta.channel_number;
                const sampleValue = information.results[channelNumber-1];
  
                if (sampleValue < 0) {

                  this.toastS.success(`Message: ${JSON.stringify(information)}`, 'Free',{ "positionClass" : "toast-bottom-right"});
                }      
            }
          }
        }
      }
    });
  
  }

ngOnDestroy(){

  if(this.messageSubscription){
    this.messageSubscription.unsubscribe();
  }

}


  onSubmit() {
  
    const ALERT: Alerts = {
      name: this.alertsForm.get('name')?.value,
      station_id: this.alertsForm.get('station_id')?.value,
      type_alert: this.alertsForm.get('type_alert')?.value,
      channel_number: this.alertsForm.get('channel_number')?.value,
      dni: this.cookieService.get('dniCookie')

      };
          this.alertsService.saveAlert(ALERT).subscribe({
            next: (data) => {
              console.log(ALERT);
              this.getAlerts();

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
        this.getAlerts();
      }, error => {
        console.log(error)
      })
    }

   
  }