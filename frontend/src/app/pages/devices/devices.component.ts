import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { MapComponent } from '@/components/shared/map/map.component';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Device } from '@/models/device.model';
import { Router } from '@angular/router';
import { DevicesService } from '@/services/devices.service';
import { ChartsComponent } from '@/components/shared/charts/charts.component';
import { SessionsService } from '@/services/sessions.service';
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    MapComponent,
    NavbarComponent,
    CommonModule,
    ChartsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css',
})
export class DevicesComponent {
  devices: Device[] = [];
  deviceForm: FormGroup;
  isEditing: boolean = false;
  isAdmin: boolean = false;
  currentChannel: number = 1;
  power_list: any[] = [];

  style = 'mapbox://styles/mapbox/streets-v11'; // URL del estilo del mapa
  lat = 37.75; // Latitud inicial del mapa
  lng = -122.41; // Longitud inicial del mapa
  zoom = 12; // Zoom inicial

  opcionesDeFormato = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  };

  constructor(
    private fb: FormBuilder,
    public deviceService: DevicesService,
    private router: Router,
    private sessionsService: SessionsService,
    private authService: AuthService
  ) {
    this.deviceForm = this.fb.group({
      station_id: ['', Validators.required],
      coordinate_lat: ['', Validators.required],
      coordinate_lon: ['', Validators.required],
    });
  }

  ngOnInit() {
    const userData = this.authService.getSessionData();
    if (userData === 'admin') {
      this.isAdmin = true;
    }

    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.devices = devices;
        console.log(devices);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isActive(estado: string) {
    // console.log(estado == 'activo');
    return estado == 'activated' ? 'active' : 'inactive';
  }

  openDeviceDetail(id: string) {
    this.router.navigate(['devices/' + id]);
  }

  deleteDevice(event: Event, station_id: string) {
    event.stopPropagation();
    this.deviceService.deleteDevice(station_id).subscribe(
      (data) => {
        alert('Device ' + station_id + ' was removed');
        this.getDevices();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    const station_id = this.deviceForm.get('station_id')?.value;
    const lat = this.deviceForm.get('coordinate_lat')?.value;
    const lon = this.deviceForm.get('coordinate_lon')?.value;

    // Crear el objeto Device con los valores obtenidos
    const DEVICE: Device = {
      station_id: station_id,
      coordinates: {
        lng: parseFloat(lon), // Asignar lon al campo lng del objeto coordinates
        lat: parseFloat(lat), // Asignar lat al campo lat del objeto coordinates
      },
      state: 'deactivated', // Aquí puedes definir el estado según tus necesidades
      last_lectureAt: 'none', // Ejemplo: asignar la fecha actual en formato ISO
    };

    if (this.isEditing) {
      this.deviceService
        .editDevice(this.deviceForm.value.station_id, DEVICE)
        .subscribe({
          next: (data) => {
            this.getDevices();
          },

          error: (error) => {
            console.log(error);
            this.deviceForm.reset();
          },
        });
    } else {
      this.deviceService.getDevice(this.deviceForm.value.station_id).subscribe({
        next: (data) => {
          // Si encontramos un usuario con el mismo DNI reseteamos el formulario
          console.log('Device already exists:', data);
          alert('Device with the same Id already exists.');
          this.deviceForm.reset();
        },
        error: (error) => {
          // console.log(error);

          // Si no existe en la base de datos lo creamos
          console.log(DEVICE);
          this.deviceService.saveDevice(DEVICE).subscribe({
            next: (data) => {
              this.getDevices();
            },
            error: (error) => {
              console.log(error);
              this.deviceForm.reset();
            },
          });
        },
      });
    }
  }

  editDevice(device: Device) {
    this.isEditing = true;

    this.deviceForm.patchValue(device);
  }

  getDevices() {
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.devices = devices;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearForm() {
    this.isEditing = false;
    this.deviceForm.reset();
  }

  getPowers() {
    this.power_list = [];
    if (this.devices.length === 0) {
      console.log('No devices loaded yet.');
      return;
    }

    // Set the loading indicator to true

    const sessionPromises = this.devices.map((device) => {
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
      })
      .catch((error) => {
        console.error('Failed to fetch all power data:', error);
      });
  }
}
