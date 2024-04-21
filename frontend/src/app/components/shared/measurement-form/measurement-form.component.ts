import { MeasurementsService } from '@/services/measurements.service';
import { PredefinedMeasurementsService } from '@/services/predefined-measurements.service';
import { UsersService } from '@/services/users.service';
import { Component, EventEmitter, Output, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { predefinedMeasurements } from '@/models/predefinedMeasurement.model';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '@/services/devices.service';
import { Device } from '@/models/device.model';
import { Measurement } from '@/models/measurement.model';
import { ConstellationsService } from '@/services/constellations.service';
import { Constellation } from '@/models/constellation.model';
import { DataService } from '@/services/data.service';

@Component({
  selector: 'measurement-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.css',
})
export class MeasurementFormComponent {
  isConstellation = input.required<boolean>();
  station_id = input<string>();
  constellation_id = input<string>();

  freqInicial!: number;
  freqFinal!: number;
  anchoDeCanal!: number;
  measurementForm: FormGroup;
  predefinedMeasurements: predefinedMeasurements[] = [];
  predefinedView: boolean = false;
  deviceId!: string;
  device!: Device;
  measurementStopped!: boolean;
  isSelected: boolean = false;
  new!: boolean;
  measurements: Measurement[] = [];
  constellation!: Constellation;
  constellationDevices: string[] = [];
  constellationId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private measurementsService: MeasurementsService,
    private predefinedMeasurementService: PredefinedMeasurementsService,
    private usersService: UsersService,
    private dataService: DataService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private deviceService: DevicesService,
    private constellationService: ConstellationsService
  ) {
    this.measurementForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['basic', Validators.required], // Default type is 'predefined'
      mode: ['avg', Validators.required],
      freqIni: [
        '',
        [Validators.required, Validators.min(25), Validators.max(1750)],
      ],
      freqFinal: [
        '',
        [Validators.required, Validators.min(25), Validators.max(1750)],
      ],
      bandwidth: ['', [Validators.required, Validators.min(0)]],
      threshold: [''],
      t_capt: [''],
      nfft: [''],
    });
    const idD = this.route.snapshot.paramMap.get('station_id');
    if (idD !== null) {
      this.deviceId = idD;
    }

    const idC = this.route.snapshot.paramMap.get('id');
    if (idC !== null) {
      this.constellationId = idC;
    }
  }

  ngOnInit() {
    this.predefinedMeasurementService.getPredefinedMeasurements().subscribe({
      next: (predefinedMeasurements) => {
        this.predefinedMeasurements = predefinedMeasurements;
      },
      error: (err) => {
        console.log(err);
      },
    });

    if (window.location.href.includes('/constellations/')) {
      console.log('Constelation');

      this.constellationService
        .getConstellation(this.constellationId)
        .subscribe({
          next: (constellation) => {
            this.constellation = constellation;
            for (let i = 0; i < this.constellation.devices_list.length; i++) {
              this.constellationDevices[i] = this.constellation.devices_list[i];
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.log('Devices');
      this.deviceService.getDevice(this.deviceId).subscribe({
        next: (data) => {
          this.device = data;
          if (this.device.state == 'activated') {
            this.measurementStopped = false;
          } else {
            this.measurementStopped = true;
          }
        },
        error: (error) => {},
      });

      this.measurementsService.getMeasurements().subscribe({
        next: (data) => {
          this.measurements = data;
        },
      });
    }
  }
  onChangeTypeOfMeasurement(event: any) {
    const selectedValue = event.target.value;
    const element = document.getElementById('advancedOptions');
    if (selectedValue === 'predefined') {
      this.predefinedView = true;
    } else {
      this.predefinedView = false;
      if (element)
        if (selectedValue === 'advanced') {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
    }
  }

  onSubmit() {
    const type = this.measurementForm.value.type;
    const message = {
      name: this.measurementForm.value.name,
      user_dni: this.cookieService.get('dniCookie'),
      type: {
        isConstellation: this.isConstellation(),
        id:
          this.isConstellation() === true
            ? this.constellation_id()
            : this.station_id(),
      },
      freqIni: this.measurementForm.value.freqIni,
      freqFinal: this.measurementForm.value.freqFinal,
      bandwidth: this.measurementForm.value.bandwidth,
      threshold: this.measurementForm.value.threshold,
      t_capt: this.measurementForm.value.t_capt,
      nfft: this.measurementForm.value.nfft,
      mode: this.measurementForm.value.mode,
    };

    console.log(type);
    const result = {
      topic: this.isConstellation()
        ? `constellation_id_pub_${this.constellation_id()}`
        : `station_id_pub_${this.station_id()}`,
      message:
        type === 'basic'
          ? {
              name: this.measurementForm.value.name,
              user_dni: this.cookieService.get('dniCookie'),
              type: {
                isConstellation: this.isConstellation(),
                id:
                  this.isConstellation() === true
                    ? this.constellation_id()
                    : this.station_id(),
              },
            }
          : message,
    };

    console.log(result);
    this.measurementsService.startMeasurement(result).subscribe({
      next: (response) => {
        console.log('Measurement started successfully:', response);
        this.dataService.changeMeasurementState(true);
        if (!this.isConstellation) {
          this.measurementStopped = false;
          this.device.state = 'activated';
          this.edit(this.device);
        } else {
          this.measurementStopped = false;
          for (let j = 0; j < this.constellationDevices.length; j++) {
            this.deviceService
              .getDevice(this.constellationDevices[j])
              .subscribe({
                next: (data) => {
                  this.device = data;
                  this.device.state = 'activated';
                  this.editDevicesConstellation(
                    this.constellationDevices[j],
                    this.device
                  );
                },
                error: (error) => {},
              });
          }
        }
      },
      error: (err) => {
        console.error('Error starting measurement:', err);
      },
    });
  }

  onReset() {
    this.measurementForm.reset();
  }

  edit(DEVICE: Device) {
    this.deviceService.editDevice(this.deviceId, DEVICE).subscribe({
      next: (data) => {
        console.log(data);
        // Lógica adicional si es necesario
      },
      error: (error) => {
        console.error('Error editing device:', error);
      },
    });
  }

  editDevicesConstellation(deviceConstellationId: string, DEVICE: Device) {
    this.deviceService.editDevice(deviceConstellationId, DEVICE).subscribe({
      next: (data) => {
        console.log(data);
        // Lógica adicional si es necesario
      },
      error: (error) => {
        console.error('Error editing device:', error);
      },
    });
  }

  stopMeasurement() {
    if (this.measurementStopped) {
      return; // Evitar ejecución múltiple
    }

    // this.deviceService.getDevice(this.deviceId).subscribe({
    // next: (data) => {
    // this.device = data;

    const result = {
      topic: 'station_id_pub_' + this.deviceId,
    };
    this.measurementsService.stopMeasurement(result).subscribe({
      next: (data) => {
        this.measurementStopped = true;

        if (this.device.state !== 'deactivated') {
          this.device.state = 'deactivated';
          this.device.last_lectureAt = this.formatDateTime(new Date(), 'es-ES');
          this.edit(this.device);
        }
      },
      error: (error) => {
        console.error('Error stopping measurement:', error);
      },
    });
    // },
    //   error: (error) => {
    //     console.error('Error getting device:', error);
    //   }
    // });
  }

  formatDateTime(date: Date, locale: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Usar formato de 24 horas
    };
    return date.toLocaleString(locale, options);
  }

  onPredefinedChange(event: any) {
    const selectedPredefined = event.target.value;

    if (selectedPredefined) {
      this.isPredefined(selectedPredefined);
    }
  }

  onNameChange(event: any) {
    const selectedName = event.target.value;

    this.measurementsService
      .getMeasurementByName(selectedName)
      .subscribe((data) => {
        this.measurementForm.patchValue({ data });
      });
  }

  onNewChange(event: any) {
    const selectNew = event.target.value;
    this.isSelected = true;
    if (selectNew == 'yes') {
      this.new = true;
    } else {
      this.new = false;
    }
  }

  isPredefined(name: string) {
    this.predefinedMeasurementService
      .getPredefineMeasurement(name)
      .subscribe((data) => {
        this.measurementForm.patchValue({
          type: 'predefined',
          freqIni: data.freqIni,
          freqFinal: data.freqFinal,
          // name: data.name
        });
      });
  }
}
