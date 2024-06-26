import { Component, Input, OnInit, input } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '@/environment';
import { Device } from '@/models/device.model';
import * as GeoJSON from 'geojson';
import { random } from '@turf/turf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { ImageServiceService } from '@/services/image-service.service';
import { blob } from 'stream/consumers';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'], // Corrected from 'styleUrl' to 'styleUrls'
})
export class MapComponent implements OnInit {
  @Input() devices!: Device[]; // Ensure devices are passed as an array of Device
  @Input() power!: any[];
  @Input() channel: number = 1;
  heatmap = input.required<boolean>();
  map!: mapboxgl.Map;
  constructor(private imageService: ImageServiceService) {}
  ngOnInit() {
    this.initializeMap();
  }

  captureMapScreenshot() {
    const mapElement = document.getElementById('map') as HTMLElement; // Ensure it is HTMLElement
    if (mapElement) {
      html2canvas(mapElement).then((canvas: HTMLCanvasElement) => {
        const dataUrl = canvas.toDataURL('image/png'); // Correctly capture the data URL
        const filename = `map-screenshot-${new Date().toISOString()}.png`;
        console.log(dataUrl);
        console.log(filename);
        this.imageService.uploadImage(dataUrl, filename).subscribe({
          next: (response) => console.log('Image saved successfully', response),
          error: (error) => console.error('Failed to save image', error),
        });
      });
    } else {
      console.error('Map element not found');
    }
  }
  initializeMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-8.687971522957469, 42.16972099256685],
      zoom: 17,
      preserveDrawingBuffer: true, // Enable capturing the map canvas
    });

    this.map.on('load', () => {
      if (this.heatmap()) {
        this.map.addSource('heatmapSource', {
          type: 'geojson',
          data: this.mergeDataAndPrepareHeatmapSource(),
        });

        this.map.addLayer({
          id: 'heatmap',
          type: 'heatmap',
          source: 'heatmapSource',
          maxzoom: 18,
          paint: {
            'heatmap-weight': [
              'interpolate',
              ['exponential', 1.5], // A moderate exponential base for scaling
              ['get', 'power'],
              -40,
              0.1,
              0,
              0.5,
              40,
              1.5, // Increased maximum weight for stronger emphasisªª
            ],
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              18,
              3,
            ],
            // Customize the colors based on your preference
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(57,70,121,0)',
              0.125,
              'rgb(55,114,226)',
              0.25,
              'rgb(1,249,238)',
              0.375,
              'rgb(62,254,0)',
              0.5,
              'rgb(255,247,6)',
              0.625,
              'rgb(254,172,0)',
              0.75,
              'rgb(253,114,4)',
              0.875,
              'rgb(255,76,0)',
              1,
              'rgb(255,3,1)',
            ],
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              0.8, // At the lowest zoom level, opacity is set at 0.8
              17,
              0.8, // Maintain the opacity at 0.8 up to zoom level 17
              20,
              0.1, // You might want to gradually reduce opacity after zoom level 17
            ],

            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2, // At the lowest zoom level, radius is small
              17,
              150, // Increase radius up to zoom level 17
              25,
              10, // Optionally, reduce radius at higher zoom levels if needed
            ],
          },
        });
      }

      this.addMarkers();
    });
  }

  mergeDataAndPrepareHeatmapSource(): GeoJSON.FeatureCollection<GeoJSON.Point> {
    const features: GeoJSON.Feature<GeoJSON.Point>[] = this.devices.map(
      (device) => {
        const powerData = this.power.find(
          (p) => p.device_id === device.station_id
        );
        const powerValue = powerData
          ? powerData.results[this.channel - 1]
          : Math.floor(Math.random() * 61 + 20); // Default to 0 if undefined

        return {
          type: 'Feature',
          properties: {
            power: powerValue || 0,
          },
          geometry: {
            type: 'Point',
            coordinates: [device.coordinates.lng, device.coordinates.lat],
          },
        };
      }
    );
    console.log(features);
    return {
      type: 'FeatureCollection',
      features: features,
    };
  }

  addMarkers() {
    if (this.devices) {
      this.devices.forEach((device) => {
        const marker = new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat([device.coordinates.lng, device.coordinates.lat])
          .addTo(this.map);
        this.map.on('zoom', () => {
          // Get the current zoom level.
          const zoomLevel = this.map.getZoom();
          // Show or hide markers based on zoom level.
          if (zoomLevel > 15) {
            // Show markers
            marker.getElement().style.display = 'block';
          } else {
            // Hide markers
            marker.getElement().style.display = 'none';
          }
        });
        marker.setPopup(
          new mapboxgl.Popup({ maxWidth: '500px' }).setHTML(
            `<span>Device ID: ${device.station_id}</span>
             <span>Status: ${device.state}</span>
             <span>Coordinates: lat ${device.coordinates.lat}, lng ${device.coordinates.lng}</span>`
          )
        );
      });
    }
    this.map.resize(); // Resize map to fit container dimensions
    // this.captureMapScreenshot();
  }
}
