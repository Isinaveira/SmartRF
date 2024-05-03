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
  numberOfButtons!: number;
  constellation_id!: string;
  devices_list: any[] = [];
  power_list: any[] = [];
  loadingDevices: boolean = false;
  currentChannel: number = 1;
  first: boolean = true;

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
    }
  }

  getDevices() {
    this.devices_list = [];
    this.loadingDevices = true;
    this.constellationService
      .getConstellation(this.constellation_id)
      .subscribe({
        next: (constellation) => {
          const devicePromises = constellation.devices_list.map(
            (device_id: any) => {
              return new Promise<void>((resolve, reject) => {
                this.devicesService.getDevice(device_id).subscribe({
                  next: (device) => {
                    if (
                      !this.devices_list.some(
                        (d) => d.station_id === device.station_id
                      )
                    ) {
                      this.devices_list.push(device);
                    }
                    resolve();
                  },
                  error: (error) => {
                    console.error(error);
                    reject(error);
                  },
                });
              });
            }
          );

          // Wait for all the device promises to resolve before proceeding to fetch power data
          Promise.all(devicePromises)
            .then(() => {
              this.loadingDevices = false;
              console.log('All devices fetched:', this.devices_list);
              this.getPower(); // Call getPower only once here after all devices are loaded
            })
            .catch((error) => {
              this.loadingDevices = false;
              console.error('Failed to fetch all devices:', error);
            });
        },
        error: (err) => {
          console.error(err);
          this.loadingDevices = false;
        },
      });
  }

  getPower() {
    let times = 0;
    this.power_list = [];
    if (this.devices_list.length === 0) {
      console.log('No devices loaded yet.');
      return;
    }

    this.loadingDevices = true;
    const sessionPromises = this.devices_list.map((device) => {
      return new Promise<void>((resolve, reject) => {
        this.sessionsService.getSessionOfDevice(device.station_id).subscribe({
          next: (session) => {
            const resultsArray = JSON.parse(session.results);
            times += 1;
            const powerData = {
              device_id: device.station_id,
              results: resultsArray,
              date: session.date,
            };
            if (this.first) {
              this.first = false;
              this.numberOfButtons = resultsArray.length;
              console.log(this.numberOfButtons);
            }
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

    // Wait for all the session promises to complete
    Promise.all(sessionPromises)
      .then(() => {
        console.log('All power data fetched:', this.power_list);
        this.loadingDevices = false;
      })
      .catch((error) => {
        console.error('Failed to fetch all power data:', error);
        this.loadingDevices = false;
      });
  }

  isActive(estado: string) {
    return estado == 'activated' ? 'active' : 'inactive';
  }

  openDeviceDetail(id: string) {
    this.router.navigate(['devices/' + id]);
  }

  reloadMap(i: number): void {
    this.getDevices(); // This method fetches the devices and updates devices_list
    this.currentChannel = i;
  }
}
