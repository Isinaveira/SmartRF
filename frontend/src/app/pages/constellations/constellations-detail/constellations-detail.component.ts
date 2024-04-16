import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { MeasurementFormComponent } from '@/components/shared/measurement-form/measurement-form.component';
import { ActivatedRoute } from '@angular/router';
import { ConstellationsService } from '@/services/constellations.service';
import { DevicesService } from '@/services/devices.service';
import { Device } from '@/models/device.model';
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
    this.constellationService.getConstellation(this.constellation_id).subscribe({
      next: (constellation) => {
        constellation.devices_list.forEach((device_id:any) => {
          this.devicesService.getDevice(device_id).subscribe({
            next: (device)=>{
              this.devices_list.push(device);
            },
            error: (error)=> console.log(error)
          })
        });  
        
      },
      error: (err) => {
        console.log(err)
      }
    })
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
