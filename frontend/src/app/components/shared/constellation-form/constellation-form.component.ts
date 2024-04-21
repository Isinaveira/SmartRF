import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Validators, FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { ConstellationsService } from '@/services/constellations.service';
import { Constellation } from '@/models/constellation.model';
import { DevicesService } from '@/services/devices.service';
import { Device } from '@/models/device.model';
import { Console } from 'console';

@Component({
  selector: 'app-constellation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './constellation-form.component.html',
  styleUrl: './constellation-form.component.css'
})
export class ConstellationFormComponent {

  constellationForm: FormGroup;
  Devices: Device[]=[];
  Constellations: Constellation[] = [];
  num_constellations!: number;

  constructor(private constellationsService : ConstellationsService, private fb: FormBuilder, private deviceService: DevicesService) { 

    this.constellationForm = this.fb.group({
      
      constellation_id: ['', Validators.required],
      name: ['', Validators.required],
      constellation_stations: ['', Validators.required],
    


    })

  }


  ngOnInit(){

    this.deviceService.getDevices().subscribe({
      next: (Devices) => {
        this.Devices = Devices;

      },
      error: (err) => {
        console.log(err);
      }
      
    })


  }

  onSubmit(){

    this.constellationsService.getConstellations().subscribe({
      next: (Constellations) => {
        this.Constellations = Constellations;
        this.num_constellations = this.Constellations.length;
        console.log(this.num_constellations);


        if(this.num_constellations < 6){

          const constellation_id = this.constellationForm.get('constellation_id')?.value;
          const name = this.constellationForm.get('name')?.value;
          const stations = this.constellationForm.get('constellation_stations')?.value;
          if(stations.length == 3){
      
            
          
          const station1 = stations[0];
          const station2 = stations[1];
          const station3 = stations[2];
        
          if(station1 == station2 || station1 == station3 || station2 == station3){
            console.log('Do not repeat stations');
            alert('Do not repeat stations');
            this.closeForm();
          }else{
      
          const CONSTELLATION: Constellation = {
            constellation_id:  constellation_id,
            name: name,
            devices_list:[station1,station2,station3],
            createdAt: this.formatDateTime(new Date(), 'es-ES'),  
            isActive: false  
          };
      
          this.constellationsService.getConstellation(this.constellationForm.value.constellation_id).subscribe({
            next: (data) => {
              // Si encontramos un usuario con el mismo DNI reseteamos el formulario
              console.log('Constellation already exists:', data);
              alert('Constellation with the same Id already exists.');
              this.constellationForm.reset();
            },
            error: (error) => {
              
              // Si no existe en la base de datos lo creamos
              console.log(CONSTELLATION);
              this.constellationsService.createConstellations(CONSTELLATION).subscribe({
                next: (data) => {
                  location.reload();
                },
                error: (error) => {
                  console.log(error);
                  this.constellationForm.reset();
                }
              });
            }
          });
        }
      }
      else{
        alert('Select 3 devices');
        console.log('Select 3 devices');
        this.closeForm();
      }
      }
      else{
      
        alert('Maximum number of constellations is 6');
        console.log('Maximum number of constellations is 6');
        this.closeForm();
      }
      },
      error: (err) => {
        console.log(err);
      }
     })


  }

  getConstellations() {

    this.constellationsService.getConstellations().subscribe({
      next: (constellations) => {
        this.Constellations = constellations
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  formatDateTime(date: Date, locale: string): string {
    const options: Intl.DateTimeFormatOptions = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false // Usar formato de 24 horas
    };
    return date.toLocaleString(locale, options);
}

  closeForm(){

    this.constellationForm.reset();

  }


}