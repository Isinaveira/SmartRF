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
  //changes the behavior of subscribe.
  realTime = input.required<boolean>();
  nChannels!: number;

  //Charts to display
  avgNormalizedPwrbyChannel = input<boolean>(true);
  occPercentageByChannel = input<boolean>(true);
  normalizedPowerByChannel = input<boolean>(true);
  currentChannelState = input<boolean>(true);
  measurementInfo = input<boolean>(true);

  //data to receive
  samplesDataInput = input<any[]>([]);

  samplesData: any[] | undefined = [];

  //Socket
  messageSubscription: Subscription | undefined;

  totalOfSamples: number = 0;

  //Occupation chart
  channelOccupation: { name: string; value: number; color: string }[] = [];

  //Percentage chart
  channelOccupationPercentage: { name: string; value: number }[] = [];

  //barChart
  channelAvgOccupation: { name: string; value: number }[] = [];

  custom_colors: string[] = [];
  //Power per channel by time
  samplesPerChannel: { name: string; series: any[] }[] = [];
  colorSchemeNC = 'fire';
  viewPie: [number, number] = [1500, 300];
  device_id = input.required<string>();

  threshold!: number;

  constructor(
    private fb: FormBuilder,
    private websocketService: WebsocketService,
    private ChartsService: ChartsService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.realTime()) {
      this.dataService.currentMessage.subscribe((message: boolean) => {
        if (message) {
          this.measurementReady();
        }
      });
    } else {
      this.dataService.samplesData.subscribe((samples: any[]) => {
        if (samples.length!= 0) {
          
          this.processData(samples);
        }
      });
    }
  }

  processData(samples: any[]) {
  
    samples = samples.map((s) => {
      return {
        ...s, 
        results: JSON.parse(s.results) // Parsea el campo results y lo reemplaza
      };
    });
      if (samples) {
        this.channelAvgOccupation = this.calcularPromedio(samples).map(
          (channel, index) => {
            return {
              name: `channel ${index + 1}`,
              value: channel,
            };
          }
        );
        this.channelOccupationPercentage = this.calcularPorcentaje(samples).map((channel, index) => {
          return {
            name: `channel ${index + 1}`,
            value: channel,
          };
        });
      }
    
  }
  calcularPromedio(samples: any[]): number[] {
    if(samples != undefined){
      const resultadoFinal: number[] = samples.reduce(
        (acumulador: number[], elemento: any) => {
          elemento.results.forEach((valor: number, indice: number) => {
            acumulador[indice] = (acumulador[indice] || 0) + valor;
          });
          return acumulador;
        },
        []
      );
  
      const longitud: number = samples.length;
  
      const resultadoFinalPromedio: number[] = resultadoFinal.map(
        (valor: number) => valor / longitud
      );
  
      return resultadoFinalPromedio;

    }else{
      return []
    }
  }

  calcularPorcentaje(samples: any[]): number[] {
    if(samples != undefined){
      const conteo: number[] = Array(samples[0].results.length).fill(0);
  
      samples.forEach((elemento: any) => {
        elemento.results.forEach((valor: number, indice: number) => {
          if (valor > 0) {
            conteo[indice]++;
          }
        });
      });
  
      const longitud: number = samples.length;
  
      const porcentaje: number[] = conteo.map(
        (valor: number) => (valor / longitud) * 100
      );
  
      return porcentaje;

    }else{
      return []
    }
  }

  measurementReady() {
    this.websocketService.getMessageUpdates('charts').subscribe((data) => {
      this.totalOfSamples++;
      this.samplesPerChannel = [...data[this.device_id()]];
      this.channelOccupation = this.samplesPerChannel.map((channel) => {
        return {
          name: channel.name,
          value: channel.series[channel.series.length - 1].value,
          color:
            channel.series[channel.series.length - 1].value < 0
              ? '#00FF00'
              : '#FF0000',
        };
      });
      this.channelAvgOccupation = this.samplesPerChannel.map((channel) => {
        const actual_channel_value = this.channelAvgOccupation.find(
          (c) => c.name == channel.name
        );
        if (actual_channel_value != undefined) {
          const avg_value =
            (actual_channel_value.value * (this.totalOfSamples - 2) +
              channel.series[channel.series.length - 1].value) /
            (this.totalOfSamples - 1);
          return {
            name: channel.name,
            value: avg_value,
          };
        } else {
          return {
            name: channel.name,
            value: 0,
          };
        }
      });

      this.channelOccupationPercentage = this.samplesPerChannel.map(
        (channel) => {
          const actual_channel_state = this.channelOccupationPercentage.find(
            (c) => c.name == channel.name
          );
          if (actual_channel_state != undefined) {
            const occupated =
              channel.series[channel.series.length - 1].value > 0 ? 1 : 0;
            const avg_occupation =
              ((actual_channel_state.value / 100) * (this.totalOfSamples - 2) +
                occupated) /
              (this.totalOfSamples - 1);
            return {
              name: channel.name,
              value: avg_occupation * 100,
            };
          } else {
            return {
              name: channel.name,
              value: 0,
            };
          }
        }
      );

      //this.cdRef.detectChanges(); // Forzar la detección de cambios
    });
    this.websocketService.threshold.subscribe((t) => {
      this.threshold = t;
    });
  }

  calculateColors() {
    this.channelOccupation.forEach;
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
