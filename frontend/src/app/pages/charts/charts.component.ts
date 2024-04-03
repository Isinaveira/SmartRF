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


import { DummyData } from './data'


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


 
  max = -60;
  min = -120;
  step = 1;
  maxDate: string;
  chartForm: FormGroup;
  value ='';
  
  mqttMessages: any[] = []; // Array to store all MQTT messages
  maxMessages = 9;

  isRT: boolean = true;

  
    //Channels

  channels: number[] = Array(10).fill(0); 
  total: number = 0;
  testData: number[] = [1,0,1,0,1,0,1,0,1,0];
  testData1: number[] = [];
  k = 0;
  


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
  
    this.generaDatos();
    this.websocketService.getMessageUpdates().subscribe(data => {
      // console.log('Received MQTT message:', data);

      this.updateChart(data);


    });
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
          console.log('Canal', j + 1, 'ocupado'); 
          this.channels[j]++; 
         
        }

        DummyData.DataEjemplo[j].value = (this.channels[j]/this.total)*100;
      }
    }

  console.log(this.total);
    this.generaDatos();
   }
   
   generaDatos(){
  
   while(this.k<3){
     this.k++;
     this.testData1 = Array.from({ length: 10 }, () => Math.random() > 0.5 ? 1 : 0);
     this.updateChart(this.testData1);
     
   }
  }

   dataNC = DummyData.DataEjemplo;
   viewNC: [number, number] = [2000, 150];
   animationsNC = true;
   colorSchemeNC = "fire"
   viewPie: [number, number] = [1500, 300];

  


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






/// Pruebas


// Options for Line Chart

  // dataLC = DummyData.annualWageSalary;
  // viewLC: [number, number] = [700, 300];
  // animationsLC = true;
  // showGridLinesLC = true;
  // legendLC = true;
  // legendTitleLC = "Countries";
  // roundDomainsLC = true;
  // xAxisLC = true;
  // yAxisLC = true;

  // currencyFormatterLC(moneyAmount: any): string {
  //   const currencyFormat = new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   });
  //   return currencyFormat.format(moneyAmount);
  // }

  // dateFormatterLC(date: string): string {
  //   const datePipe = new DatePipe("en-US");
  //   let formatted = datePipe.transform(date);
  //   return formatted ? formatted : date;
  // }
 
  // Options for Number Cards
  // dataNC = DummyData.highestAvgAnnualSalary;
  // viewNC: [number, number] = [800, 150];
  // animationsNC = true;
  // colorSchemeNC = "fire";

  // currencyFormatterNC(moneyAmount: any): string {
  //   const currencyFormat = new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   });
  //   return currencyFormat.format(moneyAmount.value);
  // }