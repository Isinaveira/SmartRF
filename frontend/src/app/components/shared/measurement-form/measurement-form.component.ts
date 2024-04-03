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
  
  constructor(private formBuilder: FormBuilder) {
    this.measurementForm = this.formBuilder.group({
      name: [''],
      type: ['', Validators.required],
      freqIni: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      freqFinal: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      threshold: [''], // No se especifica validación porque no está requerido
      t_capt: ['', Validators.required],
      chanBW: ['', [Validators.required, Validators.min(0)]],
      nfft: ['', Validators.required],
      mode: ['', Validators.required],
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
    // Aquí puedes acceder a los valores del formulario
    console.log(this.measurementForm.value);
    // También puedes realizar otras acciones, como enviar los datos a un servidor
  }

  onReset() {
    this.measurementForm.reset();
  }
}
