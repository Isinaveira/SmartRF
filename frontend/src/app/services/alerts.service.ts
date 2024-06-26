import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alerts } from '@/models/alerts.model';
import { WebsocketService } from './websocket.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public isActivated: boolean = false;
  messageSubscription: Subscription | undefined;
  alerts: Alerts[] = [];
  

  url: string = "http://localhost:3000/alerts"

  constructor(
    private http: HttpClient,
    public websocketService: WebsocketService,
    private toastS: ToastrService,
  ) { }


  saveAlert(alerts: Alerts): Observable<any> {
    return this.http.post(this.url, alerts);
  }
  

  getAlerts(): Observable<any> {
    return this.http.get(this.url);
  }


  // Metodo para borrar usuarios
  deleteAlert(name: string): Observable<any> {
    return this.http.delete(this.url+ "/" + name);
  }

  activateAlerts(){

    if(!this.isActivated){

      this.isActivated = true;
    
      

      this.getAlerts().subscribe({
        next: (alerts) => {
          this.alerts = alerts
        },
        error: (err) => {
          console.log(err)
        }
      })
      console.log(this.alerts);
      this.messageSubscription=this.websocketService.getMessageUpdates('alerts').subscribe(data => {
        console.log('Received MQTT message:', data);
        // Add the received message to the array
        //this.mqttMessages.push(data);
        this.websocketService.received_messages.push(data);
        //Manejo de alertas
        const d = JSON.parse(data.message);
        let information = d.payload;
        information.results = JSON.parse(information.results);
        
        if (this.alerts.length > 0) {
    
          for (const alerta of this.alerts) {
  
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


    } else {

      this.deactivateAlerts();
    }
  }

  deactivateAlerts(){

    this.isActivated=false;
    if(this.messageSubscription){
      this.messageSubscription.unsubscribe();
    }
  }













}
