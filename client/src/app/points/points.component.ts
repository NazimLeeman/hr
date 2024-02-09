import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapService } from '../services/map/map.service';
import { Feature, FeatureCollection, LineString } from 'geojson';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrl: './points.component.css'
})
export class PointsComponent {
map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 51.515419;  //Oxford Street Latitude
  lng: number = -0.141099;  //Oxford Street Longitude

  marker: mapboxgl.Marker | null = null;

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/examples/clg45vm7400c501pfubolb0xz',
      zoom: 11,
      center: [-87.661557, 41.893748] //Chicago
    });
        this.map.on('click', (event) => {
      const features = this.map?.queryRenderedFeatures(event.point, {
      layers: ['chicago-parks']
      });
      if (!features?.length) {
      return;
      }
          const feature = features[0];
          
          if (feature.properties && this.map) {
            
            const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(event.lngLat)
            .setHTML(
            `<h3>${feature.properties['title']}</h3><p>${feature.properties['description']}</p>`
            )
            .addTo(this.map);
          }
          });
      
  }

}
