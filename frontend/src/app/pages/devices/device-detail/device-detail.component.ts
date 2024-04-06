import { Device } from '@/models/device.model';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChartsComponent } from '@/components/shared/charts/charts.component';
import { MeasurementFormComponent } from '@/components/shared/measurement-form/measurement-form.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [NavbarComponent, ChartsComponent, MeasurementFormComponent],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent {
  device!: Device;
  device_id!: string;
  constructor(private location: Location, private route: ActivatedRoute){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== null ) {
     this.device_id = id;
    }
    
  }
}
