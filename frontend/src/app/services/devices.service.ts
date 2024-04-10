import { Device } from '@/models/device.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  url: string = "http://localhost:3000/devices";
  
  
  constructor(private http: HttpClient) { }

  saveDevice(device: Device): Observable<any> {
    return this.http.post(this.url, device);
  }

  // Editar un usuario
  editDevice(station_id: string, device: Device): Observable<any> {
    return this.http.put(this.url+ "/edit/" + station_id,  device);
  }

  // Método para obtener usuarios
  getDevices(): Observable<any> {
    return this.http.get(this.url);
  }

  // Obtener un usuario, necesario para editar
  getDevice(station_id: string): Observable<any> {
    return this.http.get(this.url + "/" + station_id);
  }

  // Método para borrar usuarios
  deleteDevice(station_id: string): Observable<any> {
    return this.http.delete(this.url+ "/" + station_id);
  }
  
}
