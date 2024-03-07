import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '@/environment';
import { Device } from '@/models/device.model';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  @Input() devices!: Device[];
  map!: mapboxgl.Map

  ngOnInit(){
    this.initializeMap();
  }

  initializeMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor HTML donde se mostrará el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-8.687971522957469, 42.16972099256685], // Coordenadas iniciales (longitud, latitud)
      zoom: 17, // Nivel de zoom inicial
    });

    if(this.devices != undefined) {

    this.devices.forEach(dispositivo => {
      const properties = {
        lat: dispositivo.coordenadas.lat,
        lng: dispositivo.coordenadas.lng,
        nombre: dispositivo.id_dispositivo,
        estado: dispositivo.estado
      } // Ajusta según tu estructura de datos
      
      // Crea un marcador en el mapa
      const marker = new mapboxgl.Marker({color: '#FF0000'})
        .setLngLat([properties.lng, properties.lat])
        .addTo(this.map);
    
      marker.setPopup(new mapboxgl.Popup().setHTML(
        `
        <span>ID dispositivo:${properties.nombre}</span>
        <span>estado:${properties.estado}</span>
        
        `));
    });

  }
    this.map.resize();
  }
}
