import { AuthService } from '@/services/auth.service';
import { MeasurementsService } from '@/services/measurements.service';
import { PredefinedMeasurementsService } from '@/services/predefined-measurements.service';
import { UsersService } from '@/services/users.service';
import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { predefinedMeasurements } from '@/models/predefinedMeasurement.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'measurement-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.css'
})
export class MeasurementFormComponent {

  isConstellation = input.required<boolean>();
  station_id = input<string>();
  constellation_id = input<string>();

  freqInicial!: number; 
  freqFinal!: number;
  anchoDeCanal!: number;
  measurementForm: FormGroup;
  predefinedMeasurements: predefinedMeasurements[] = [];
  predefinedView: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private measurementsService: MeasurementsService, 
    private predefinedMeasurementService : PredefinedMeasurementsService,
    private usersService: UsersService,
    private cookieService: CookieService
  ) {
    this.measurementForm = this.formBuilder.group({
      type: ['basic', Validators.required], // Default type is 'predefined'
      mode: ['1', Validators.required],
      freqIni: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      freqFinal: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      bandwidth: ['', [Validators.required, Validators.min(0)]],
      threshold: [''],
      t_capt: [''],
      nfft: ['1024'],
    });

   
  }

  ngOnInit(){
    this.predefinedMeasurementService.getPredefinedMeasurements().subscribe({
      next: (predefinedMeasurements) => {
        this.predefinedMeasurements = predefinedMeasurements
      },
      error: (err) => {
        console.log(err);
      }
      
    })


    
  }
  onChangeTypeOfMeasurement(event: any){    
      const selectedValue = event.target.value;
      const element = document.getElementById("advancedOptions");
      if(selectedValue === 'predefined'){
        this.predefinedView=true;

      }
      else{
        this.predefinedView=false;
        if (element)
          if (selectedValue === 'advanced') {
            element.style.display = 'block';
          }        
          else {
            element.style.display = 'none';
          }
      }
     
  }
  
  onSubmit() {
    const type = this.measurementForm.value.type;
    const message = {
      name: this.measurementForm.value.name,
      user_dni: this.cookieService.get('dniCookie'), 
      type: {
        isConstellation: this.isConstellation(),
        id: (this.isConstellation() === true )? this.constellation_id() : this.station_id()
      }, 
      freqIni: this.measurementForm.value.freqIni,
      freqFinal: this.measurementForm.value.freqFinal,
      bandwidth: this.measurementForm.value.bandwidth,
      threshold: this.measurementForm.value.threshold,
      t_capt: this.measurementForm.value.t_capt,
      nfft: this.measurementForm.value.nfft
    };

    console.log(type);
    const result = {
      topic: (this.isConstellation())? `constellation_id_pub_${this.constellation_id()}`: `station_id_pub_${this.station_id()}`,
      message: (type === 'basic' )? {
        name: this.measurementForm.value.name,
        user_dni: this.cookieService.get('dniCookie'), 
        type: {
          isConstellation: this.isConstellation(),
          id: (this.isConstellation() === true )? this.constellation_id() : this.station_id()
        } 
      } : message
    };

    this.measurementsService.startMeasurement(result)
    .subscribe({
      next: (response) => {
        console.log('Measurement started successfully:', response);
      },
      error: (err) => {
        console.error('Error starting measurement:', err);
      }});
  }

  onReset() {
    this.measurementForm.reset();
  }

  onPredefinedChange(event: any){

    const selectedPredefined = event.target.value;
   
    if(selectedPredefined){
      this.isPredefined(selectedPredefined);
    }

  }

  isPredefined(name : string){

    
    this.predefinedMeasurementService.getPredefineMeasurement(name).subscribe((data) => {
      
      this.measurementForm.patchValue({
        type: "predefined",
        freqIni: data.freqIni,
        freqFinal: data.freqFinal
      });

    });


  }
}
