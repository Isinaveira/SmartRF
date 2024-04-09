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
@Component({
  selector: 'app-constellations-detail',
  standalone: true,
  imports: [NavbarComponent, MeasurementFormComponent, DecimalPipe,  CommonModule],
  templateUrl: './constellations-detail.component.html',
  styleUrl: './constellations-detail.component.css'
})
export class ConstellationsDetailComponent implements OnInit {
  id_constellation!: string;
  devices_list!: Device[];
  constructor(
    private route: ActivatedRoute, 
    private constellationService: ConstellationsService,
    private router: Router,
    private devicesService: DevicesService) {}
  

  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
   if(id !== null ) {
    this.id_constellation = id;
   }
   this.getDevicesOfConstellation(this.id_constellation);
  }
  getDevicesOfConstellation( id_constellation: string){
    const devices_ids = this.constellationService.constellations
                           .filter( c => (c._id == id_constellation))[0].devices_list
    this.devices_list = devices_ids.map( device_id => {
       return this.devicesService.devices.filter( d => d._id === device_id )[0]
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
