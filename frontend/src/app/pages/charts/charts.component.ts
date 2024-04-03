import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { chartTune } from '@/models/chartTune.model';
import { WebsocketService } from '@/services/websocket.service';





@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NavbarComponent, NgxChartsModule, CommonModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule, ReactiveFormsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {


  //Form
  max = -60;
  min = -120;
  step = 1;
  maxDate: string;
  isRT: boolean = true;
  chartForm: FormGroup;
  value ='';

  //Socket
  mqttMessages: any[] = []; // Array to store all MQTT messages
  maxMessages = 9;

  
  //Channels
  channels: number[] = Array(10).fill(0); 
  total: number = 0;
  testData: number[] = []; // pruebas generar datos
  k = 0; // pruebas generar datos
  samplesPerChannel: { name: string; value: number; }[] = []; 
  first = true; 


  //Charts 
  dataNC = this.samplesPerChannel;
  viewNC: [number, number] = [2000, 150];
  animationsNC = true;
  colorSchemeNC = "fire"
  viewPie: [number, number] = [1500, 300];

 


  constructor(private fb: FormBuilder, private websocketService: WebsocketService) {

    
    this.chartForm = this.fb.group({

      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      channelBW: ['', Validators.required],
      startFreq: ['', Validators.required],
      finishFreq: ['', Validators.required],
      amplitudeTreshold: ['', Validators.required],


    });

        // Obtiene la fecha de hoy en formato ISO (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
    
        // Establece la fecha máxima como la fecha de hoy
        this.maxDate = today;
  }


  ngOnInit(): void {

   // this.generaDatos();
    this.websocketService.getMessageUpdates().subscribe(data => {
      // console.log('Received MQTT message:', data);
    
    if(this.first){
    
    this.first = false;
    const num_channels = JSON.parse(data).length;
    this.initObjectChannels(num_channels);

    }

    this.updateChart(JSON.parse(data));


    });
  }

  
  initObjectChannels(num_channels: number) {
    

    for(let m=0; m<num_channels; m++){

        this.samplesPerChannel.push( {

            name: `channel${m}`,
            value: 0,

        })

    }
  
  }

  updateChart(data: number[]): void {
  
    console.log(data);
    this.total++;
    this.mqttMessages.fill(0);
    
  
    // Agrega el mensaje recibido al array
    this.mqttMessages.push(data);
  
    for (let i = 0; i < this.mqttMessages.length; i++) {
      for (let j = 0; j < this.mqttMessages[i].length; j++) {
        if (this.mqttMessages[i][j] === 1) { 
   
          this.channels[j]++; 
         
        }

        //this.samplesPerChannel[j].value = (this.channels[j]/this.total)*100;
        this.samplesPerChannel[j].value = ((this.samplesPerChannel[j].value*(this.total - 1) + this.channels[j])/this.total)
      }
    }


    //this.generaDatos();
   }
   
  //  generaDatos(){
  
  //  while(this.k<3){
  //    this.k++;
  //    this.testData = Array.from({ length: 10 }, () => Math.random() > 0.5 ? 1 : 0);
  //    this.updateChart(this.testData);
     
  //  }
  // }

  setCustom(){

    this.isRT = false;

    const chartTune: chartTune = {
      startDate: this.chartForm.get('startDate')?.value,
      finishDate: this.chartForm.get('finishDate')?.value,
      channelBW: this.chartForm.get('channelBW')?.value,
      startFreq: this.chartForm.get('startFreq')?.value,
      finishFreq: this.chartForm.get('finishFreq')?.value,
      amplitudeTreshold: this.chartForm.get('amplitudeTreshold')?.value,
    };

  }

  setRT(){

    this.isRT = true;
  }



}






