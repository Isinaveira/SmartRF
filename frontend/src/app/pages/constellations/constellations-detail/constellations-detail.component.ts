import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { MeasurementFormComponent } from '@/components/shared/measurement-form/measurement-form.component';
import { ActivatedRoute } from '@angular/router';
import { ConstellationsService } from '@/services/constellations.service';
import { DevicesService } from '@/services/devices.service';
import { SessionsService } from '@/services/sessions.service';
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
    MapComponent,
  ],
  templateUrl: './constellations-detail.component.html',
  styleUrl: './constellations-detail.component.css',
})
export class ConstellationsDetailComponent implements OnInit {
  numberOfButtons: number = 5;
  constellation_id!: string;
  devices_list: any[] = [];
  power_list: any[] = [];
  loadingDevices: boolean = false;
  currentChannel: Number = 1;
  constructor(
    private route: ActivatedRoute,
    private constellationService: ConstellationsService,
    private router: Router,
    private devicesService: DevicesService,
    private sessionsService: SessionsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.constellation_id = id;
      this.getDevices();
      this.getPowers();
    }
  }

  getDevices() {
    this.loadingDevices = true; // Set the loading indicator to true
    this.constellationService
      .getConstellation(this.constellation_id)
      .subscribe({
        next: (constellation) => {
          const devicePromises = constellation.devices_list.map(
            (device_id: any) => {
              return new Promise<void>((resolve, reject) => {
                this.devicesService.getDevice(device_id).subscribe({
                  next: (device) => {
                    // Check if the device is already in the list before adding it
                    if (
                      !this.devices_list.some(
                        (d) => d.station_id === device.station_id
                      )
                    ) {
                      this.devices_list.push(device);
                    }
                    resolve(); // Resolve the promise once the device has been processed
                  },
                  error: (error) => {
                    console.error(error);
                    reject(error); // Reject the promise in case of an error
                  },
                });
              });
            }
          );

          // Wait for all the promises to complete before updating the UI
          Promise.all(devicePromises).then(() => {
            this.loadingDevices = false; // Set the loading indicator to false once all devices are fetched
            console.log(this.devices_list);
          });
        },
        error: (err) => {
          console.error(err);
          this.loadingDevices = false; // Set the loading indicator to false in case of an error
        },
      });
  }
  getPowers() {
    this.power_list = [];
    if (this.devices_list.length === 0) {
      console.log('No devices loaded yet.');
      return;
    }

    this.loadingDevices = true; // Set the loading indicator to true

    const sessionPromises = this.devices_list.map((device) => {
      return new Promise<void>((resolve, reject) => {
        this.sessionsService.getSessionOfDevice(device.station_id).subscribe({
          next: (session) => {
            // Assume 'power' is a field in session data that we want to collect
            const powerData = {
              device_id: device.station_id,
              results: session.results, //Take into account that this is an array of undefined length
              date: session.date,
            };
            this.power_list.push(powerData);
            resolve();
          },
          error: (error) => {
            console.error(
              `Error fetching session for device ${device.station_id}: `,
              error
            );
            reject(error);
          },
        });
      });
    });

    // Wait for all the promises to complete before updating the UI
    Promise.all(sessionPromises)
      .then(() => {
        console.log('All power data fetched:', this.power_list);
        this.loadingDevices = false; // Set the loading indicator to false once all sessions are fetched
      })
      .catch((error) => {
        console.error('Failed to fetch all power data:', error);
        this.loadingDevices = false; // Set the loading indicator to false in case of errors
      });
  }

  isActive(estado: string) {
    return estado == 'activated' ? 'active' : 'inactive';
  }

  openDeviceDetail(id: string) {
    this.router.navigate(['devices/' + id]);
  }

  reloadMap(i: Number): void {
    this.getDevices(); // This method fetches the devices and updates devices_list
    this.getPowers();
    this.currentChannel = i;
  }
}
