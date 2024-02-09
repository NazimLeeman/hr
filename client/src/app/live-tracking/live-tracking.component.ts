import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapService } from '../services/map/map.service';
import { Feature, FeatureCollection, LineString, Point } from 'geojson';

@Component({
  selector: 'app-live-tracking',
  templateUrl: './live-tracking.component.html',
  styleUrl: './live-tracking.component.css'
})
export class LiveTrackingComponent {
 map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v12';
  lat: number = 51.515419;  
  lng: number = -0.141099;  
  // updateSource: any | null;

  marker: mapboxgl.Marker | null = null;

  ngOnInit(): void {
  this.map = new mapboxgl.Map({
    accessToken: environment.mapbox.accessToken,
    container: 'map',
    style: this.style,
    zoom: 1.5,
    // center: [this.lng, this.lat]
  });

  this.map.on('load', async () => {
    try {
      const geojson: FeatureCollection<Point> = await this.getLocation();
      this.map?.addSource('iss', {
        type: 'geojson',
        data: geojson
      });
      //. Add the rocket symbol layer to the map.
      this.map?.addLayer({
        'id': 'iss',
        'type': 'symbol',
        'source': 'iss',
        'layout': {
          'icon-image': 'rocket'
        }
      })
      
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }
  });
     
  }
  
  updateSource = setInterval(async () => {
  const geojson = await this.getLocation(); 
  const source = this.map?.getSource('iss');
  if (source && source.type === 'geojson') {
    source.setData(geojson);
  }
}, 5000);


async getLocation(): Promise<FeatureCollection<Point>> {
  try {
    const response = await fetch(
      'https://api.wheretheiss.at/v1/satellites/25544',
      { method: 'GET' }
    );
    const { latitude, longitude } = await response.json();
    // Fly the map to the location.
    this.map?.flyTo({
      center: [longitude, latitude],
      speed: 0.5
    });
    // Return the location of the ISS as GeoJSON.
    return {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [longitude, latitude]
          },
          'properties': {} 
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching ISS location:", error);
    throw error;
  }
}
  

}
