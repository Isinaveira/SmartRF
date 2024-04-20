import { Component, Input, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '@/environment';
import { Device } from '@/models/device.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'], // Corrected from 'styleUrl' to 'styleUrls'
})
export class MapComponent implements OnInit {
  @Input() devices!: Device[]; // Ensure devices are passed as an array of Device
  @Input() power!: Number[];
  @Input() channel: Number = 1;
  map!: mapboxgl.Map;

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // Container ID where the map will be displayed
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-8.687971522957469, 42.16972099256685], // Initial coordinates (longitude, latitude)
      zoom: 17, // Initial zoom level
    });

    this.addMarkers(); // Add markers after map initialization
  }

  addMarkers() {
    if (this.devices) {
      this.devices.forEach((device) => {
        // Directly access devices as an array
        const properties = {
          lat: device.coordinates.lat,
          lng: device.coordinates.lng,
          nombre: device.station_id,
          estado: device.state,
        }; // Adjust according to your data structure

        // Create a marker on the map
        const marker = new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat([properties.lng, properties.lat])
          .addTo(this.map);

        marker.setPopup(
          new mapboxgl.Popup({ maxWidth: '500px' }).setHTML(
            `<span>Device ID: ${properties.nombre}</span>
               <span>Status: ${properties.estado}</span>
               <span>Coordinates: lat ${properties.lat}, lng ${properties.lng}</span>`
          )
        );
      });
    }
    this.map.resize(); // Resize map to fit container dimensions
  }
}
