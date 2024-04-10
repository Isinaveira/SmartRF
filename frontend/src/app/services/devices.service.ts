import { Device } from '@/models/device.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  url: string = "http://localhost:3000/devices";
  devices: Device[] = [
    {
      _id: "1",
      coordinates: { lng: -8.689038314733466,lat: 42.17065472083152},
      state: "activo",
      last_lectureAt: "2024-02-23T10:00:00Z",
    },
    {
      _id: "2",
      coordinates: { lng: -8.689744429290187, lat: 42.169751113048505 },
      state: "inactivo",
      last_lectureAt: "2024-02-22T15:30:00Z",
    },
    {
      _id: "3",
      coordinates: { lng: -8.687306048086725, lat: 42.17065472083152 },
      state: "activo",
      last_lectureAt: "2024-02-24T09:20:00Z",
    },
    {
      _id: "4",
      coordinates: { lng: -8.686259576153134, lat: 42.16949508849626 },
      state: "inactivo",
      last_lectureAt: "2024-02-25T14:45:00Z",
    },
    {
      _id: "5",
      coordinates: { lng: -8.686955530788651, lat: 42.168855022583045 },
      state: "activo",
      last_lectureAt: "2024-02-26T12:10:00Z",
    },
    {
      _id: "6",
      coordinates: { lng: -8.688469359118926, lat: 42.1688211365599 },
      state: "inactivo",
      last_lectureAt: "2024-02-27T08:30:00Z",
    },
  ];
  
  constructor(private http: HttpClient) { }

  saveDevice(device: Device): Observable<any> {
    return this.http.post(this.url, DevicesService);
  }

  // Editar un usuario
  editDevice(station_id: number, device: Device): Observable<any> {
    return this.http.put(this.url+ "/edit/" + station_id,  device);
  }

  // Método para obtener usuarios
  getDevices(): Observable<any> {
    return this.http.get(this.url);
  }

  // Obtener un usuario, necesario para editar
  getDevice(station_id: number): Observable<any> {
    return this.http.get(this.url + "/" + station_id);
  }

  // Método para borrar usuarios
  deleteDevice(station_id: number): Observable<any> {
    return this.http.delete(this.url+ "/" + station_id);
  }
  
}
