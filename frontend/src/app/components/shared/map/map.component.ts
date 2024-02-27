import { Component, Input } from '@angular/core';
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
  @Input() devices!: any[];
  map!: mapboxgl.Map

  ngOnInit(){
    this.initializeMap();
    console.log(this.devices);
  }

  initializeMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor HTML donde se mostrará el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-8.687971522957469, 42.16972099256685], // Coordenadas iniciales (longitud, latitud)
      zoom: 17, // Nivel de zoom inicial
    });

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
        <h3>ID dispositivo:${properties.nombre}</h3>
        <h3>estado:${properties.estado}</h3>
        
        `));
    });


    this.map.resize();
  }
}
