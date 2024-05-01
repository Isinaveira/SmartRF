import { ChangeDetectorRef, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { WebsocketService } from '@/services/websocket.service';
import { ChartsService } from '@/services/charts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '@/services/data.service';

@Component({
  selector: 'charts',
  standalone: true,
  imports: [
    NgxChartsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    ReactiveFormsModule,
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent {
  // //Form
  // max = -60;
  // min = -120;
  // step = 1;
  // maxDate: string;
  // isRT: boolean = true;
  // chartForm: FormGroup;
  // value ='';
  

  //Global 



  //Socket
  messageSubscription: Subscription | undefined;

  totalOfSamples: number = 0;

  //Occupation chart
  channelOccupation: {name: string, value: number , color: string}[] = [];

  //Percentage chart
  channelOccupationPercentage: {name: string, value: number}[] = [];

  //barChart
  channelAvgOccupation: {name: string, value: number}[] = [];

  custom_colors: string[] = [];
  //Power per channel by time  
  samplesPerChannel: { name: string; series: any[] }[] = [];
  colorSchemeNC = 'fire';
  viewPie: [number, number] = [1500, 300];
  device_id = input.required<string>();

  realTime = input.required<boolean>();

  threshold!: number;


  constructor(
    private fb: FormBuilder,
    private websocketService: WebsocketService,
    private ChartsService: ChartsService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef
  ) {
    
  }

  ngOnInit(){
    if(this.realTime()){
      this.dataService.currentMessage.subscribe((message:boolean) => {
        if(message){
          this.measurementReady();
        }
      } );
    }else{
      //else subscribe to DDBB
      console.log("DDBB");
    }

  }

  measurementReady(){
     this.websocketService.getMessageUpdates('charts').subscribe( data => {
      this.totalOfSamples ++;
      this.samplesPerChannel = [...data[this.device_id()]];
      this.channelOccupation = this.samplesPerChannel.map(channel => { 
        
        return {
          name: channel.name,
          value: channel.series[channel.series.length-1].value,
          color: channel.series[channel.series.length-1].value < 0 ? '#00FF00': '#FF0000'
        }
      });
      this.channelAvgOccupation = this.samplesPerChannel.map(channel => {
        const actual_channel_value = this.channelAvgOccupation.find(c => c.name == channel.name) 
        if(actual_channel_value != undefined){
          const avg_value = (actual_channel_value.value * (this.totalOfSamples-2) + channel.series[channel.series.length-1].value) / (this.totalOfSamples-1);
          return {
            name: channel.name,
            value: avg_value  
          }
        }else{
          return {
            name: channel.name,
            value: 0
          }
        }
      });

      this.channelOccupationPercentage = this.samplesPerChannel.map( channel => {
        const actual_channel_state = this.channelOccupationPercentage.find(c => c.name == channel.name)
        if(actual_channel_state != undefined){
          const occupated = (channel.series[channel.series.length-1].value > 0)? 1 : 0;
          const avg_occupation = ((actual_channel_state.value/100) * (this.totalOfSamples-2) + occupated) / (this.totalOfSamples-1);
          return {
            name: channel.name,
            value: avg_occupation*100  
          } 
        }else{
          return {
            name: channel.name,
            value: 0
          }
        }
      })

      //this.cdRef.detectChanges(); // Forzar la detección de cambios
          
    });
    this.websocketService.threshold.subscribe( t => {
      this.threshold = t;
    })
  }


  calculateColors(){
    this.channelOccupation.forEach
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

}
