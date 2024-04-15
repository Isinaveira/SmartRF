import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Validators, FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { ConstellationsService } from '@/services/constellations.service';
import { Constellation } from '@/models/constellation.model';
import { DevicesService } from '@/services/devices.service';
import { Device } from '@/models/device.model';

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


  constructor(private constellationsService : ConstellationsService, private fb: FormBuilder, private deviceService: DevicesService) { 

    this.constellationForm = this.fb.group({
      
      constellation_id: ['', Validators.required],
      name: ['', Validators.required],
      constellation_station1: ['', Validators.required],
      constellation_station2: ['', Validators.required],
      constellation_station3: ['', Validators.required],


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
    },
    error: (err) => {
      console.log(err);
    }
   })

   if(this.Constellations.length < 6){

    const constellation_id = this.constellationForm.get('constellation_id')?.value;
    const name = this.constellationForm.get('name')?.value;
    const station1 = this.constellationForm.get('constellation_station1')?.value;
    const station2 = this.constellationForm.get('constellation_station2')?.value;
    const station3 = this.constellationForm.get('constellation_station3')?.value;

    if(station1 == station2 || station1 == station3 || station2 == station3){
      console.log('Do not repeat stations');
      alert('Do not repeat stations');
      this.closeForm();
    }else{

    const CONSTELLATION: Constellation = {
      constellation_id:  constellation_id,
      name: name,
      devices_list:[station1,station2,station3],
      createdAt: '',  
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
        // console.log(error);

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

  alert('Maximum number of constellations is 6');
  console.log('Maximum number of constellations is 6');
}
  }


  closeForm(){

    this.constellationForm.reset();

  }


}