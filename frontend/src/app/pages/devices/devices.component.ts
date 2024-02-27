import { Component, ElementRef, QueryList, ViewChildren, NgZone, AfterViewInit } from '@angular/core';
import moment from 'moment';
import { MapComponent } from 'src/app/components/shared/map/map.component';


@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {

  style = 'mapbox://styles/mapbox/streets-v11'; // URL del estilo del mapa
  lat = 37.75; // Latitud inicial del mapa
  lng = -122.41; // Longitud inicial del mapa
  zoom = 12; // Zoom inicial


  devices = [
    {
      id_dispositivo: 1,
      coordenadas: { lat: 40.416775, lng: -3.703790 },
      estado: "activo",
      fecha_ultima_lectura: "2024-02-23T10:00:00Z",
      imagen_path: "../../assets/dispositivo1.jpg",
      lecturas: [
        { canal: 1, potencia: -60 },
        { canal: 2, potencia: -58 },
        { canal: 3, potencia: -55 },
        { canal: 4, potencia: -52 },
        { canal: 5, potencia: -50 },
        { canal: 6, potencia: -48 },
        { canal: 7, potencia: -46 },
        { canal: 8, potencia: -44 },
        { canal: 9, potencia: -42 },
        { canal: 10, potencia: -40 },
      ],
    },
    {
      id_dispositivo: 2,
      coordenadas: { lat: 41.387917, lng: 2.169919 },
      estado: "inactivo",
      fecha_ultima_lectura: "2024-02-22T15:30:00Z",
      imagen_path: "../../assets/dispositivo2.jpg",
      lecturas: [
        { canal: 1, potencia: -55 },
        { canal: 2, potencia: -53 },
        { canal: 3, potencia: -50 },
        { canal: 4, potencia: -48 },
        { canal: 5, potencia: -46 },
        { canal: 6, potencia: -44 },
        { canal: 7, potencia: -42 },
        { canal: 8, potencia: -40 },
        { canal: 9, potencia: -38 },
        { canal: 10, potencia: -36 },
      ],
    },
    {
      id_dispositivo: 3,
      coordenadas: { lat: 39.469907, lng: -0.376288 },
      estado: "activo",
      fecha_ultima_lectura: "2024-02-24T09:20:00Z",
      imagen_path: "../../assets/dispositivo3.jpg",
      lecturas: [
        { canal: 1, potencia: -52 },
        { canal: 2, potencia: -50 },
        { canal: 3, potencia: -48 },
        { canal: 4, potencia: -46 },
        { canal: 5, potencia: -44 },
        { canal: 6, potencia: -42 },
        { canal: 7, potencia: -40 },
        { canal: 8, potencia: -38 },
        { canal: 9, potencia: -36 },
        { canal: 10, potencia: -34 },
      ],
    },
    {
      id_dispositivo: 4,
      coordenadas: { lat: 35.689487, lng: 139.691711 },
      estado: "inactivo",
      fecha_ultima_lectura: "2024-02-25T14:45:00Z",
      imagen_path: "../../assets/dispositivo4.jpg",
      lecturas: [
        { canal: 1, potencia: -58 },
        { canal: 2, potencia: -56 },
        { canal: 3, potencia: -54 },
        { canal: 4, potencia: -52 },
        { canal: 5, potencia: -50 },
        { canal: 6, potencia: -48 },
        { canal: 7, potencia: -46 },
        { canal: 8, potencia: -44 },
        { canal: 9, potencia: -42 },
        { canal: 10, potencia: -40 },
      ],
    },
    {
      id_dispositivo: 5,
      coordenadas: { lat: -33.868820, lng: 151.209296 },
      estado: "activo",
      fecha_ultima_lectura: "2024-02-26T12:10:00Z",
      imagen_path: "../../assets/dispositivo5.jpg",
      lecturas: [
        { canal: 1, potencia: -55 },
        { canal: 2, potencia: -53 },
        { canal: 3, potencia: -50 },
        { canal: 4, potencia: -48 },
        { canal: 5, potencia: -46 },
        { canal: 6, potencia: -44 },
        { canal: 7, potencia: -42 },
        { canal: 8, potencia: -40 },
        { canal: 9, potencia: -38 },
        { canal: 10, potencia: -36 },
      ],
    },
    {
      id_dispositivo: 6,
      coordenadas: { lat: 51.509865, lng: -0.118092 },
      estado: "inactivo",
      fecha_ultima_lectura: "2024-02-27T08:30:00Z",
      imagen_path: "../../assets/dispositivo6.jpg",
      lecturas: [
        { canal: 1, potencia: -52 },
        { canal: 2, potencia: -50 },
        { canal: 3, potencia: -48 },
        { canal: 4, potencia: -46 },
        { canal: 5, potencia: -44 },
        { canal: 6, potencia: -42 },
        { canal: 7, potencia: -40 },
        { canal: 8, potencia: -38 },
        { canal: 9, potencia: -36 },
        { canal: 10, potencia: -34 },
      ],
    },
  ];
  
  opcionesDeFormato = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  };

  constructor() {}

  ngOnInit(){
   
  }

  generateTime(fechaOriginal: string): string {
    // Lógica para formatear la fecha
    const fecha = moment(fechaOriginal);
    return fecha.format('DD/MM/YYYY HH:mm:ss');
  }
 }
