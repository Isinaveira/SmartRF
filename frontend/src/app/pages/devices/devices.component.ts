import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { MapComponent } from '@/components/shared/map/map.component';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Device } from '@/models/device.model';
import { DataService } from '@/services/data.service';
import { Router } from '@angular/router';
import { DevicesService } from '@/services/devices.service';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [MapComponent, NavbarComponent, CommonModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {

  devices!: Device[];

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
    timeZone: 'UTC'
  };

  constructor( public devicesService: DevicesService, private router: Router) {}

  ngOnInit(){
   this.devices = this.devicesService.devices;
   console.log(this.devices)
  }

  generateTime(date: string): string {
    // Lógica para formatear la fecha
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }


  isActive(estado: string){
    console.log(estado == 'activo');
    return (estado == 'activo')? 'active' : 'inactive';
  }

  openDeviceDetail(id: string){
    this.router.navigate(["devices/"+id])
  }
 }
