import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { MapComponent } from '@/components/shared/map/map.component';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Device } from '@/models/device.model';
import { DataService } from '@/services/data.service';
import { Router } from '@angular/router';

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

  constructor( public dataService: DataService, private router: Router) {}

  ngOnInit(){
   this.devices = this.dataService.devices;
   console.log(this.devices)
  }

  generateTime(fechaOriginal: string): string {
    // Lógica para formatear la fecha
    const fecha = moment(fechaOriginal);
    return fecha.format('DD/MM/YYYY HH:mm:ss');
  }

  isActive(estado: String){
    console.log(estado == 'activo');
    return (estado == 'activo')? 'active' : 'inactive';
  }

  openDeviceDetail(id: number){
    this.router.navigate(["devices/"+id])
  }
 }
