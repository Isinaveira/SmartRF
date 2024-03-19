import { Component } from '@angular/core';

@Component({
  selector: 'app-constellations-detail',
  standalone: true,
  imports: [],
  templateUrl: './constellations-detail.component.html',
  styleUrl: './constellations-detail.component.css'
})
export class ConstellationsDetailComponent {
  freqInicial!: number 
  freqFinal!: number
  anchoDeCanal!: number

  constructor(){

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
  

  validateForm() {
    

    if (this.freqFinal <= 25 || this.freqFinal >= 1764) {
        alert('La frecuencia final debe estar entre 25 MHz y 1764 MHz.');
        return false;
    }

    if (this.freqInicial >= this.freqFinal) {
        alert('La frecuencia inicial debe ser menor que la frecuencia final.');
        return false;
    }

    if (this.anchoDeCanal > (this.freqFinal - this.freqInicial)) {
        alert('El ancho de canal debe ser menor o igual al ancho de banda total a evaluar.');
        return false;
    }

    
    console.log("Enviar a formulario")
    return true;
  }
}
