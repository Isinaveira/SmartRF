import { Device } from '@/models/device.model';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { DataService } from '@/services/data.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent {
  device!: Device;

  constructor(private dataService: DataService, private location: Location){}

  ngOnInit(){
   const current_id = this.location.path().split("/").pop();
    if (current_id != undefined)
      this.device = this.dataService.devices.filter(d => (d.id_dispositivo == parseInt(current_id)))[0];
  
    console.log(this.device);
  }
}
