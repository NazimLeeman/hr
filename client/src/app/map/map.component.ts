import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import MapBoxDirections from '@mapbox/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  // map: mapboxgl.Map | undefined;
  // style = 'mapbox://styles/mapbox/streets-v11';
  // lat: number = 30.2672;
  // lng: number = -97.7431;

  // ngOnInit() {
  //   this.map = new mapboxgl.Map({
  //     accessToken: environment.mapbox.accessToken,
  //     container: 'map',
  //     style: this.style,
  //     zoom: 11,
  //     center: [this.lng, this.lat]
  //   });

  //   this.map.on('load', ()=> {
  //     this.map?.addSource('earthquakes', {
  //       type: 'geojson',
  //       // Use a URL for the value for the `data` property.
  //       data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
  //     });
      
  //     this.map?.addLayer({
  //       'id': 'earthquakes-layer',
  //       'type': 'circle',
  //       'source': 'earthquakes',
  //       'paint': {
  //         'circle-radius': 4,
  //         'circle-stroke-width': 2,
  //         'circle-color': 'red',
  //         'circle-stroke-color': 'white'
  //       }
  //     });

  //     this.map?.addSource(
  //       'Austin Hex', 
  //       {
  //         'type': 'geojson',
  //         'data': {
  //           'type': 'Feature',
  //           'properties': [],
  //           'geometry': {
  //             'type': 'Polygon',
  //             'coordinates': [
  //               [
  //                 [ -97.792921355615277, 30.127749592004189 ], 
  //                 [ -97.792921355615277, 30.196912993949898 ], 
  //                 [ -97.723644348336762, 30.231476492188843 ], 
  //                 [ -97.654367341058247, 30.196912993949898 ], 
  //                 [ -97.654367341058247, 30.127749592004189 ], 
  //                 [ -97.723644348336762, 30.093149704984011 ], 
  //                 [ -97.792921355615277, 30.127749592004189 ]
  //               ]
  //             ]
  //           }
  //         }
  //       }
  //     );

  //     this.map?.addSource(
  //       'Austin Points', 
  //       {
  //         'type': 'geojson',
  //         'data': {
  //           'type': 'FeatureCollection',
  //           'features': [
  //             {
  //               'type': 'Feature',
  //               'geometry': {
  //                 'type': 'Point',
  //                 'coordinates': [-97.693686723567652, 30.282059053494251]
  //               },
  //               'properties': {
  //                 'title': 'Austin 1'
  //               }
  //             },
  //             {
  //               'type': 'Feature',
  //               'geometry': {
  //                 'type': 'Point',
  //                 'coordinates': [-97.763899906620225, 30.251333606714322]
  //               },
  //               'properties': {
  //                 'title': 'Austin 2'
  //               }
  //             }
  //           ]
  //         }
  //       }
  //     );
  //     this.map?.addLayer({
  //         'id': 'Austin Hex',
  //         'type': 'fill',
  //         'source': 'Austin Hex', 
  //         'layout': {},
  //         'paint': {
  //           'fill-color': '#0080ff', 
  //           'fill-opacity': 0.5
  //         }
  //     });
  //     this.map?.addLayer({
  //       'id': 'Austin Points',
  //       'type': 'circle', 
  //       'source': 'Austin Points', 
  //       'layout': {},
  //       'paint': {
  //         'circle-color': 'blue',
  //         'circle-radius': 6,
  //         'circle-stroke-width': 2,
  //         'circle-stroke-color': 'white'
  //       }
  //     });
  //   });
  // }
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v12'

  usersCurrentLatitude: number = 0
  usersCurrentLongitude: number = 0

  selectedLatitude!: number
  selectedLongitude!: number

  ngOnInit(): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.usersCurrentLatitude = latitude;
        this.usersCurrentLongitude = longitude;

        if (latitude && longitude) {
          console.log(this.usersCurrentLongitude && this.usersCurrentLatitude)
          this.initializeMapAndMarker()
        }

      }, (error) => {
        console.log('Permission dey nai');
      });
    }


  }


  initializeMapAndMarker() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      center: [this.usersCurrentLongitude, this.usersCurrentLatitude],
      zoom: 12
    })

    this.marker = new mapboxgl.Marker({ color: 'red', draggable: true })
      .setLngLat([this.usersCurrentLongitude, this.usersCurrentLatitude])
      .addTo(this.map)

    this.marker.on('dragend', this.onDragEnd)

    this.addMapboxGeocoderControl() 
  }

  onDragEnd = () => {
    console.log('marker', this.marker);
    if (this.marker) {
      const lngLat = this.marker.getLngLat()
      console.log('lnglat', lngLat);
    }
  }

       addMapboxGeocoderControl() {
    this.map?.addControl(
      new MapboxGeocoder({
        accessToken: environment.mapbox.accessToken,
        mapboxgl: mapboxgl,
      })
    );
       }
  
  // addMapboxDirections() {
  //   this.map?.addControl(
  //     new MapBoxDirections({
  //       accessToken: environment.mapbox.accessToken,
  //       mapboxgl: mapboxgl,
  //     })
  //   )
  // }
}
