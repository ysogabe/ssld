import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat, ProjectionLike, transform } from 'ol/proj';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import CircleStyle from 'ol/style/Circle';

@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.css'],
})
export class AddPointComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public name: string = 'ルナ';
  public cursor: string = 'auto';
  public map!: Map;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((p) => {
      console.log(p);
    });
    if (!navigator.geolocation) {
      alert('Geolocation APIに対応していません');
      return;
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos);
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const markerFeature = new Feature({
          type: 'geoMarker',
          geometry: new Point(
            transform([lon, lat], 'EPSG:4326', 'EPSG:900913')
          ),
        });
        const makerSource = new VectorSource({ features: [markerFeature] });
        const makerLayer = new VectorLayer({
          source: makerSource,
          style: new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({
                color: '#3399CC',
              }),
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
          }),
        });
        this.map.addLayer(makerLayer);
        this.map.setView(
          new View({
            center: fromLonLat([lon, lat]),
            zoom: 17,
          })
        );
      });
    }

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([139.75, 35.68]),
        zoom: 17,
      }),
    });
  }
}
