import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import MapBoxDirections from '@mapbox/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapService } from '../map.service';
import { Feature, FeatureCollection, LineString } from 'geojson';


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
  endMarker!: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v12'

  usersCurrentLatitude: number = 0
  usersCurrentLongitude: number = 0

  selectedLatitude!: number
  selectedLongitude!: number

  start: number[] = [];
  end: number[] = [];

  previousMarker: mapboxgl.Marker | null = null;

  popup = new mapboxgl.Popup({ offset: 25 });

  constructor(private mapboxService:MapService) {}

  ngOnInit(): void {

    if (navigator.geolocation) {
        let mapInitialized = false;
    navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.usersCurrentLatitude = latitude;
      this.usersCurrentLongitude = longitude;
      this.start = [this.usersCurrentLongitude, this.usersCurrentLatitude];
      if (!mapInitialized) { // Check if map is not initialized
        console.log(this.usersCurrentLongitude, this.usersCurrentLatitude);
        this.initializeMapAndMarker();
        mapInitialized = true;
      } else {
        this.updateMarkerAndPopupContent(); // Update marker and popup content
      }
    }, (error) => {
      console.log('Permission denied');
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
  });

  // Create marker
  this.marker = new mapboxgl.Marker({ color: 'red', draggable: true })
    .setLngLat([this.usersCurrentLongitude, this.usersCurrentLatitude])
    .addTo(this.map);

  // Create popup
  this.popup = new mapboxgl.Popup({ offset: 25 });

  // Update marker and popup content
  this.updateMarkerAndPopupContent();
}

updateMarkerAndPopupContent() {
  // Update marker position
  this.marker.setLngLat([this.usersCurrentLongitude, this.usersCurrentLatitude]);

  // Update popup content
  const popupContent = `<h3>Information</h3><p>Latitude: ${this.usersCurrentLatitude}</p><p>Longitude: ${this.usersCurrentLongitude}</p>`;

  // Set new content to the existing popup
  this.popup.setHTML(popupContent);

  // Attach popup to marker
  this.marker.setPopup(this.popup);
}

  //------------------checking--------------
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       this.usersCurrentLatitude = latitude;
  //       this.usersCurrentLongitude = longitude;
  //       this.start = [this.usersCurrentLongitude, this.usersCurrentLatitude];
  //       if (latitude && longitude) {
  //         console.log(this.usersCurrentLongitude && this.usersCurrentLatitude)
  //         this.initializeMapAndMarker()
  //       }

  //     }, (error) => {
  //       console.log('Permission dey nai');
  //     });
  //   }


  // }


  // initializeMapAndMarker() {
  //   this.map = new mapboxgl.Map({
  //     accessToken: environment.mapbox.accessToken,
  //     container: 'map',
  //     style: this.style,
  //     center: [this.usersCurrentLongitude, this.usersCurrentLatitude],
  //     zoom: 12
  //   })

  //   this.marker = new mapboxgl.Marker({ color: 'red', draggable: true })
  //     .setLngLat([this.usersCurrentLongitude, this.usersCurrentLatitude])
  //     .addTo(this.map);
    
  //   const popupContent = `<h3>Information</h3><p>Latitude: ${this.usersCurrentLatitude}</p><p>Longitude: ${this.usersCurrentLongitude}</p>`;
  //   const popup = new mapboxgl.Popup({ offset: 25 })
  //   .setHTML(popupContent);

  //   // Attach popup to marker
  //   this.marker.setPopup(popup);
  //   popup.addTo(this.map);

  //   this.marker.on('dragend', this.onDragEnd)

  //   this.addMapboxGeocoderControl() 
  // }

  onDragEnd = () => {
    console.log('marker', this.marker);
    if (this.marker) {
      const lngLat = this.marker.getLngLat()
      console.log('lnglat', lngLat);
      this.start = [lngLat.lng, lngLat.lat];
      console.log('start', this.start)
      this.gettingRoute(this.end)
    }
    
  }

       addMapboxGeocoderControl() {
    this.map?.addControl(
      new MapboxGeocoder({
        accessToken: environment.mapbox.accessToken,
        mapboxgl: mapboxgl,
      })
    );
         this.gettingEnd()
       }
  
  // addMapboxDirections() {
  //   this.map?.addControl(
  //     new MapBoxDirections({
  //       accessToken: environment.mapbox.accessToken,
  //       mapboxgl: mapboxgl,
  //     })
  //   )
  // }

  gettingRoute(end: any[]) {
    this.end = end;
    this.mapboxService.getRoute(this.map, this.start, end).subscribe((data: any) => {
      // console.log('getting route',data)
      const route = data.routes[0].geometry.coordinates;
      console.log(route);
    const geojson: Feature<LineString> = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
  
      if (this.map.getSource('route')) {
      (this.map.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson);
      // this.map.getSource('route').setData(geojson);
    } else {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
  });
  }

  gettingEnd() {
    this.map.on('click', (event: any) => {
      console.log('event',event)
    const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
    const end: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }
      ]
    };
  
    const endSource = this.map?.getSource('end');
    if (endSource) {
      const geojsonSource = endSource as mapboxgl.GeoJSONSource;
      geojsonSource.setData(end);
    } else {
      // this.map?.addLayer({
      //   id: 'end',
      //   type: 'circle',
      //   source: {
      //     type: 'geojson',
      //     data: {
      //       type: 'FeatureCollection',
      //       features: [
      //         {
      //           type: 'Feature',
      //           properties: {},
      //           geometry: {
      //             type: 'Point',
      //             coordinates: coords
      //           }
      //         }
      //       ]
      //     }
      //   },
      // });
    
      if (this.map.getLayer('end')) {
        this.map.removeLayer('end');
        this.map.removeSource('end');
      }
        if (this.previousMarker) {
        this.previousMarker.remove();
      }
      this.endMarker = new mapboxgl.Marker({ color: 'blue', draggable: true })
        .setLngLat(coords as mapboxgl.LngLatLike)
        .addTo(this.map);
      
      this.endMarker.on('dragend', this.onBlueDragEnd)
      
      this.previousMarker = this.endMarker
      
    }
      

    this.gettingRoute(coords);
  });
  }

  onBlueDragEnd = () => {
    console.log('marker', this.endMarker);
    if (this.endMarker) {
      const lngLat = this.endMarker.getLngLat()
      console.log('lnglat', lngLat);
      this.end = [lngLat.lng, lngLat.lat];
      console.log('end', this.end)
      this.gettingRoute(this.end)
    }
  }

}
