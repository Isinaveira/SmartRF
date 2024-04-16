import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { chartTune } from '@/models/chartTune.model';
import { WebsocketService } from '@/services/websocket.service';
import { ChartsService } from '@/services/charts.service';
import { Measurement } from '@/models/measurement.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


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
    ReactiveFormsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
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
  samplesPerChannel: { name: string; value: number; }[] = [];
  first = true;
  configuration!: Measurement;
  nPointsPerChan!: number;
  nChannels!: number;
  realChanBW!: number;


  //Charts
  dataNC = this.samplesPerChannel;
  viewNC: [number, number] = [2000, 150];
  animationsNC = true;
  colorSchemeNC = "fire"
  viewPie: [number, number] = [1500, 300];
  device_id!: string;

  



  constructor(private fb: FormBuilder, private websocketService: WebsocketService, private ChartsService : ChartsService, private route: ActivatedRoute) {


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


  ngOnInit(): void {

    // this.websocketService.connect(); // Conectar al WebSocket si no está conectado

    
    // Con el id podremos diferenciar los mensajes que llegan par representar solo los de la estacion correcta
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== null ) {
     this.device_id = id;
    }
    // Calcular los valores reales a partir de la configuracion

      this.ChartsService.getLastMeasureConf().subscribe({
        next: (configuration) => {
          this.configuration = configuration
          this.nPointsPerChan = Math.round(this.configuration.nfft * this.configuration.chanBW / 2.56e6);
          this.nChannels = Math.floor((this.configuration.nfft * (this.configuration.freqFinal - this.configuration.freqIni) / 2.56e6) / this.nPointsPerChan);
          this.realChanBW=this.nPointsPerChan*2.56e6/this.configuration.nfft
        },
        error: (err) => {
          console.log(err)
        }
      })

    //////////////////////////////////////////////////////////////

    // this.initObjectChannels(10);
    // this.generaDatos();
    this.messageSubscription = this.websocketService.getMessageUpdates().subscribe(data => {
      
      console.log('Received MQTT message:', data); 

      if((JSON.parse(data.message)).station_id == this.device_id){
      
    
      if(this.first){

      this.first = false;
   
      console.log((JSON.parse(data.message)).results);

      
      console.log(((JSON.parse(data.message)).results).length);

      // Inicializamos la estructura de las graficas pasando el numero de canales
      this.initObjectChannels(((JSON.parse(data.message)).results).length);

    }

   // this.initObjectChannels(this.nChannels);
   // Pasamos los resultados de las mediciones
    this.updateChart((JSON.parse(data.message)).results);
    
  }

    });

  }
  


  initObjectChannels(num_channels: number) {

    

    for(let m=0; m<num_channels; m++){

       //let frec_vector = this.configuration.freqIni + m*this.realChanBW
        this.samplesPerChannel.push( {

            name: `channel ${m}MHz`,
            value: 0,

        })

    }

  }

  updateChart(data: number[]): void {

    console.log(data);
    this.total++;
    this.mqttMessages.fill(0);
    console.log(this.mqttMessages);

    // Agrega el mensaje recibido al array
    this.mqttMessages.push(data);
    console.log(this.mqttMessages);
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

   generaDatos(){

   while(this.k<3){
     this.k++;
     this.testData = Array.from({ length: 10 }, () => Math.random() > 0.5 ? 1 : 0);
     this.updateChart(this.testData);

   }
  }

  ngOnDestroy(){

    if(this.messageSubscription){
      this.messageSubscription.unsubscribe();
    }
  
  }

  // setCustom(){

  //   this.isRT = false;

  //   const chartTune: chartTune = {
  //     startDate: this.chartForm.get('startDate')?.value,
  //     finishDate: this.chartForm.get('finishDate')?.value,
  //     channelBW: this.chartForm.get('channelBW')?.value,
  //     startFreq: this.chartForm.get('startFreq')?.value,
  //     finishFreq: this.chartForm.get('finishFreq')?.value,
  //     amplitudeTreshold: this.chartForm.get('amplitudeTreshold')?.value,
  //   };

  // }

  // setRT(){

  //   this.isRT = true;
  // }



}






