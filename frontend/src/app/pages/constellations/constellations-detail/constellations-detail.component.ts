import { Component } from '@angular/core';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Measurement } from '@/models/measurement.model';

@Component({
  selector: 'app-constellations-detail',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './constellations-detail.component.html',
  styleUrl: './constellations-detail.component.css'
})
export class ConstellationsDetailComponent {
  freqInicial!: number 
  freqFinal!: number
  anchoDeCanal!: number
  measurementForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.measurementForm = this.formBuilder.group({
      type: ['', Validators.required],
      decision_type: ['', Validators.required],
      freq_inicial: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      freq_final: ['', [Validators.required, Validators.min(25), Validators.max(1750)]],
      ancho_de_canal: ['', [Validators.required, Validators.min(0)]],
      umbral: [''], // No se especifica validación porque no está requerido
      tiempo_captura_ventana: ['', Validators.required],
      numero_pts_ventana: ['', Validators.required],
      inicio_medicion: ['', Validators.required],
      fin_medicion: ['', Validators.required]
    });

  }
  onChange(event: any){    
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
