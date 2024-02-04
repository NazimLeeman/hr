import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapService } from '../map.service';
import { Feature, FeatureCollection, LineString } from 'geojson';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {
 map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 51.515419;  //Oxford Street Latitude
  lng: number = -0.141099;  //Oxford Street Longitude
  profile = 'cycling';
  minutes = 10;

  marker: mapboxgl.Marker | null = null;

  ngOnInit(): void {
    // this.getLocation();    //for Bangladesh
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat] //Oxford Street
    });

    
    
    this.map.on('load', ()=> {
      
      console.log('Map is ',this.map);
      this.displayMultipleIsochrones()
    });

  }

  //Use to set location to Current Position(Bangladesh)
  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;


          this.lat = latitude;
          this.lng = longitude;

          // this.map?.setCenter([this.lng, this.lat]);

          console.log(longitude, latitude)
        });
    } else {
       console.log("No support for geolocation")
    }
  }


  toggleTravel(name: string) {
    this.profile = name;
    this.displayMultipleIsochrones();
    // this.getIso(this.profile, this.minutes, pair.lng, pair.lat);
  }

  toggleTime(mins: number) {
    this.minutes = mins;
    this.displayMultipleIsochrones();
    // this.getIso(this.profile, this.minutes, pair.lng, pair.lat);
  }

  async getIso(profile: string, minutes: number, lng: number, lat: number, fillColor: string) {
  const query = await fetch(
    `https://api.mapbox.com/isochrone/v1/mapbox/${profile}/${lng},${lat}?contours_minutes=${minutes}&polygons=true&denoise=0.4&generalize=0&access_token=${environment.mapbox.accessToken}`,
    { method: 'GET' }
  );
  const data = await query.json();
  const sourceId = `iso-${profile}-${minutes}-${lng}-${lat}`;

  if (!this.map?.getSource(sourceId)) {
    this.map?.addSource(sourceId, {
      type: 'geojson',
      data: data
    });
  } else {
    const source: any = this.map?.getSource(sourceId);
    source.setData(data); 
  }

  if (!this.map?.getLayer(`isoLayer-${profile}-${minutes}-${lng}-${lat}`)) {
    this.map?.addLayer(
      {
        id: `isoLayer-${profile}-${minutes}-${lng}-${lat}`,
        type: 'fill',
        source: sourceId,
        layout: {},
        paint: {
          'fill-color': fillColor,
          'fill-opacity': 0.3,
        }
      },
      'poi-label'
    );
  }
}

displayMultipleIsochrones() {
  
  const lngLatPairs = [
    { lng: -0.141099, lat: 51.515419, fillColor: '#5a3fc0' }, 
    { lng: -0.301099, lat: 51.515419, fillColor: '#ff0000' }, 
    { lng: -0.421099, lat: 51.515419, fillColor: '#05014a' }, 
    { lng: -0.021099, lat: 51.515419, fillColor: '#630000' }, 
  ];

  const profile = 'cycling';
  const minutes = 20;

  lngLatPairs.forEach((pair,index) => {
    this.getIso(profile, minutes, pair.lng, pair.lat, pair.fillColor);
    
    if (this.map) {     
      const marker = new mapboxgl.Marker({
        color: pair.fillColor,
        draggable: true
      }).setLngLat([pair.lng, pair.lat]).addTo(this.map);
    }

    this.map?.addLayer({
      id: `circleLayer-${pair.lng}-${pair.lat}-${index}`,
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [pair.lng, pair.lat]
          },
          properties: {}
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': pair.fillColor,
        'circle-opacity': 0.5
      }
    });
  });
}

}
