import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { MeasurementFormComponent } from '@/components/shared/measurement-form/measurement-form.component';
import { ActivatedRoute } from '@angular/router';
import { ConstellationsService } from '@/services/constellations.service';
import { DevicesService } from '@/services/devices.service';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { MapComponent } from '@/components/shared/map/map.component';
@Component({
  selector: 'app-constellations-detail',
  standalone: true,
  imports: [
    NavbarComponent, 
    MeasurementFormComponent, 
    DecimalPipe,  
    CommonModule, 
    MapComponent
  ],
  templateUrl: './constellations-detail.component.html',
  styleUrl: './constellations-detail.component.css'
})
export class ConstellationsDetailComponent implements OnInit {
  constellation_id!: string;
  devices_list: any[] = [];
  loadingDevices: boolean = false;
  constructor(
    private route: ActivatedRoute, 
    private constellationService: ConstellationsService,
    private router: Router,
    private devicesService: DevicesService) {}
  

  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
   if(id !== null ) {
    this.constellation_id = id;
    this.getDevices()

   }
   
  }
  
  getDevices(){
    this.loadingDevices = true; // Establecer el indicador de carga a verdadero
    this.constellationService.getConstellation(this.constellation_id).subscribe({
      next: (constellation) => {
        const devicePromises = constellation.devices_list.map((device_id: any) => {
          return new Promise<void>((resolve, reject) => {
            this.devicesService.getDevice(device_id).subscribe({
              next: (device) => {
                this.devices_list.push(device);
                resolve(); // Resolvemos la promesa una vez que se ha obtenido el dispositivo
              },
              error: (error) => {
                console.log(error);
                reject(error); // Rechazamos la promesa en caso de error
              }
            });
          });
        });

        // Esperamos a que todas las promesas se completen antes de acceder a devices_list
        Promise.all(devicePromises).then(() => {
          this.loadingDevices = false; // Establecer el indicador de carga a falso una vez que se han obtenido todos los dispositivos
          console.log(this.devices_list);
        });
      },
      error: (err) => {
        console.log(err);
        this.loadingDevices = false; // Establecer el indicador de carga a falso en caso de error
      }
    });
  }
  generateTime(date: string): string {
    // Lógica para formatear la fecha
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }


  isActive(estado: string){
    return (estado == 'activo')? 'active' : 'inactive';
  }

  openDeviceDetail(id: string){
    this.router.navigate(["devices/"+id])
  }

  

}
