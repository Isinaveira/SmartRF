import { ChangeDetectorRef, Component, ViewChild, input } from '@angular/core';
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
import { Measurement } from '@/models/measurement.model';
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

  //Socket
  mqttMessages: any[] = []; // Array to store all MQTT messages
  messageSubscription: Subscription | undefined;




  //Channels
  channels: number[] = Array(10).fill(0);
  total: number = 0;
  testData: number[] = []; // pruebas generar datos
  k = 0; // pruebas generar datos
  samplesPerChannel: { name: string; series: any[] }[] = [];
  first = true;
  configuration!: Measurement;
  nPointsPerChan!: number;
  nChannels!: number;
  realChanBW!: number;

  //Charts
  dataNC = this.samplesPerChannel;
  viewNC: [number, number] = [2000, 150];
  animationsNC = true;
  colorSchemeNC = 'fire';
  viewPie: [number, number] = [1500, 300];
  device_id = input<string>();
  channelOccupation: {name: string, value: number }[] = [];




  constructor(
    private fb: FormBuilder,
    private websocketService: WebsocketService,
    private ChartsService: ChartsService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef
  ) {
    // this.chartForm = this.fb.group({
    //   startDate: ['', Validators.required],
    //   finishDate: ['', Validators.required],
    //   channelBW: ['', Validators.required],
    //   startFreq: ['', Validators.required],
    //   finishFreq: ['', Validators.required],
    //   amplitudeTreshold: ['', Validators.required],
    // });
    //     // Obtiene la fecha de hoy en formato ISO (YYYY-MM-DD)
    //     const today = new Date().toISOString().split('T')[0];
    //     // Establece la fecha máxima como la fecha de hoy
    //     this.maxDate = today;
  }

  ngOnInit(){
    this.dataService.currentMessage.subscribe((message:boolean) => {
      console.log(message);
      if(message){
        this.measurementReady()
      }
    } );
  }

  measurementReady(){
     this.websocketService.getMessageUpdates().subscribe( data => {
      this.samplesPerChannel = [...data];


      this.channelOccupation = this.samplesPerChannel.map(channel => { 
        return {
          name: channel.name,
          value: channel.series[channel.series.length-1].value
        }
      });
      this.cdRef.detectChanges(); // Forzar la detección de cambios
      console.log(this.samplesPerChannel);    
    });
    /*
    this.messageSubscription = this.websocketService
          .dataForLineChart$.subscribe({
            next: (data) => {
              console.log(data);
              this.samplesPerChannel = data
            }, error: (err) => {
              console.log(err);
            }
          }); */
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

}
