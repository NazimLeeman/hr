import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
 map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat]
    });

    this.map.on('load', ()=> {
      this.map?.addSource('earthquakes', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });

      //       this.map?.addLayer(
      // {
      // 'id': 'earthquakes-heat',
      // 'type': 'heatmap',
      // 'source': 'earthquakes',
      // 'maxzoom': 9,
      // 'paint': {
      // 'heatmap-weight': [
      // 'interpolate',
      // ['linear'],
      // ['get', 'mag'],
      // 0,
      // 0,
      // 6,
      // 1
      // ],
     
      // 'heatmap-intensity': [
      // 'interpolate',
      // ['linear'],
      // ['zoom'],
      // 0,
      // 1,
      // 9,
      // 3
      // ],
      
      // 'heatmap-color': [
      // 'interpolate',
      // ['linear'],
      // ['heatmap-density'],
      // 0,
      // 'rgba(33,102,172,0)',
      // 0.2,
      // 'rgb(103,169,207)',
      // 0.4,
      // 'rgb(209,229,240)',
      // 0.6,
      // 'rgb(253,219,199)',
      // 0.8,
      // 'rgb(239,138,98)',
      // 1,
      // 'rgb(178,24,43)'
      // ],
      // 'heatmap-radius': [
      // 'interpolate',
      // ['linear'],
      // ['zoom'],
      // 0,
      // 2,
      // 9,
      // 20
      // ],
      // 'heatmap-opacity': [
      // 'interpolate',
      // ['linear'],
      // ['zoom'],
      // 7,
      // 1,
      // 9,
      // 0
      // ]
      // }
      // },
      // 'waterway-label'
      // );
      
      this.map?.addLayer({
        'id': 'earthquakes-layer',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white'
        }
      });

      this.map?.addSource(
        'Austin Hex', 
        {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': [],
            'geometry': {
              'type': 'Polygon',
              'coordinates': [
                [
                  [ -97.792921355615277, 30.127749592004189 ], 
                  [ -97.792921355615277, 30.196912993949898 ], 
                  [ -97.723644348336762, 30.231476492188843 ], 
                  [ -97.654367341058247, 30.196912993949898 ], 
                  [ -97.654367341058247, 30.127749592004189 ], 
                  [ -97.723644348336762, 30.093149704984011 ], 
                  [ -97.792921355615277, 30.127749592004189 ]
                ]
              ]
            }
          }
        }
      );

      this.map?.addSource(
        'Austin Points', 
        {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-97.693686723567652, 30.282059053494251]
                },
                'properties': {
                  'title': 'Austin 1'
                }
              },
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-97.763899906620225, 30.251333606714322]
                },
                'properties': {
                  'title': 'Austin 2'
                }
              }
            ]
          }
        }
      );
      this.map?.addLayer({
          'id': 'Austin Hex',
          'type': 'fill',
          'source': 'Austin Hex', 
          'layout': {},
          'paint': {
            'fill-color': '#0080ff', 
            'fill-opacity': 0.5
          }
      });
      this.map?.addLayer({
        'id': 'Austin Points',
        'type': 'circle', 
        'source': 'Austin Points', 
        'layout': {},
        'paint': {
          'circle-color': 'blue',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': 'white'
        }
      });
    });
  }
}
