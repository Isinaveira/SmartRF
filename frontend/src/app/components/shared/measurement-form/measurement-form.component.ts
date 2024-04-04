import { MeasurementsService } from '@/services/measurements.service';
import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'measurement-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.css'
})
export class MeasurementFormComponent {

  msg_type = input.required<Number>();
  device_id = input<string>();
  constellation_id = input<string>();

  freqInicial!: number; 
  freqFinal!: number;
  anchoDeCanal!: number;
  measurementForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private measurementsService: MeasurementsService) {
    this.measurementForm = this.formBuilder.group({
      type: ['predefined', Validators.required], // Default type is 'predefined'
      mode: ['1', Validators.required],
      freqIni: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      freqFinal: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      bandwidth: ['', [Validators.required, Validators.min(0)]],
      threshold: [''],
      t_capt: [''],
      nfft: ['1024']
    });

  }

  onChangeTypeOfMeasurement(event: any){    
      const selectedValue = event.target.value;
      const element = document.getElementById("advancedOptions");
      if (element)
        if (selectedValue === 'advanced') {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
  }
  
  onSubmit() {
    const type = this.measurementForm.value.type;
    const message = {
      freqIni: this.measurementForm.value.freqIni,
      freqFinal: this.measurementForm.value.freqFinal,
      bandwidth: this.measurementForm.value.bandwidth,
      threshold: this.measurementForm.value.threshold,
      t_capt: this.measurementForm.value.t_capt,
      nfft: this.measurementForm.value.nfft
    };

    console.log(type);
    const result = {
      topic: 'broadcast',
      message: (type === 'basic' )? {} : message
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
}
