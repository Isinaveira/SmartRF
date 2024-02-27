import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  map!: mapboxgl.Map

  ngOnInit(){
    this.initializeMap();
  }

  initializeMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor HTML donde se mostrará el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas iniciales (longitud, latitud)
      zoom: 9, // Nivel de zoom inicial
    });

    this.map.resize();
  }
}
