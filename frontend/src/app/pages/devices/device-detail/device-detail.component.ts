import { Device } from '@/models/device.model';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartsComponent } from '@/components/shared/charts/charts.component';
import { MeasurementFormComponent } from '@/components/shared/measurement-form/measurement-form.component';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '@/services/devices.service';
@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [NavbarComponent, ChartsComponent, MeasurementFormComponent],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent implements OnInit {
  device!: Device;
  station_id!: string;
  constructor(private route: ActivatedRoute, private devicesService: DevicesService){}

  ngOnInit(){
  
    this.getDevice();
  }


  getDevice() {

    const id = this.route.snapshot.paramMap.get('station_id');
    if(id !== null ) {
     this.station_id = id;

    this.devicesService.getDevice(id).subscribe({
      next: (device) => {
        this.device = device;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  }
}
