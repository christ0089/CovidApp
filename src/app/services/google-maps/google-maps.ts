import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject, Subject } from "rxjs";
import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Center, InterfaceCenter, CENTER_STATUS } from 'src/app/Models/iCenters';
import { NavController } from '@ionic/angular';
import { NavServiceService } from '../nav-service.service';


declare const google;


/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleMapsProvider {

  treatment_centers$ = new BehaviorSubject<Center[]>([]);
  displayCenter = [];
  markers = [];
  eventMarkers = [];
  selectedCenter: InterfaceCenter = null;
  defaultRadius = new BehaviorSubject<number>(30);

  constructor(
    private db: AngularFirestore,
    private navCtrl: NavController,
    private navSerivice: NavServiceService,
  ) {}

  getCameras(): Observable<Center[]> {
    return this.treatment_centers$;
  }

  setMapCenter(map: any, center: Center) {
    map.setCenter({ lat: center.point.latitude, lng: center.point.longitude });
  }


  addMarkersPoint(map, center: Center, index: number) {
    console.log(center);
    const marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(center.point.latitude,center.point.longitude),
      icon: {
        url: center.getIcon(),
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }
    });

    // if (center.status === CENTER_STATUS.SELECTED) {
    //   this.selectedCenter = center;
    // }

    this.markers.push(marker);

    const mapFunc = () =>  {
      this.navSerivice.setData(center);
      this.navCtrl.navigateForward('/hospital');
    }

    marker.addListener("click", mapFunc);

  }

  setPivotMaker(map: any, index, camera) {
    this.setMapCenter(map, camera);
    this.getMarkers(map, camera.Point.latitude, camera.Point.longitude)
      .toPromise()
      .catch(e => {
        console.error(e);
      });
  }

  resetMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    this.displayCenter = [];
    this.treatment_centers$.next([]);
  }


  getMarkers(_map, lat, lon) {
    let area = [new firebase.firestore.GeoPoint(lat, lon)];

    const marker = new google.maps.Marker({
      map: _map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, lon),
      icon: {
        url: '../assets/untitled.svg',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }
    });

    this.resetMarkers();
    return this.db
      .collection("TreatmentCenters", ref => {
        const query = ref
          .orderBy("point", "desc")
        return query;
      })
      .valueChanges()
      .pipe(
        map((dataPoints: InterfaceCenter[]) => {
          if (dataPoints === null) {
            return null;
          }
          area = this.updatePoints(lat, lon, this.defaultRadius.getValue());
          dataPoints.forEach((element: InterfaceCenter, index) => {
            const center = new Center(element);

            if (this.withinBouds(area, element.point) === true) {

              center.status = CENTER_STATUS.SELECTED;
              this.displayCenter.push(element);
              this.treatment_centers$.next(this.displayCenter);
              this.addMarkersPoint(_map, center, index);
            } else {

            }

          });
          return dataPoints;
        })
      );
  }

  updatePoints(latitude, longitude, distance) {
    const lat = 0.0144927536231884;
    const lon = 0.0181818181818182;
    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const greaterLat = latitude + lat * distance;
    const greaterLon = longitude + lon * distance;

    const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
    const greaterGeopoint = new firebase.firestore.GeoPoint(
      greaterLat,
      greaterLon
    );
    return [lesserGeopoint, greaterGeopoint];
  }

  withinBouds(
    bounds: firebase.firestore.GeoPoint[],
    point: firebase.firestore.GeoPoint
  ): boolean {
    console.log(point);
    console.log(bounds);
    if (
      bounds[0].latitude <= point.latitude &&
      bounds[1].latitude >= point.latitude
    ) {
      console.log("Within Lats");
      if (
        bounds[0].longitude <= point.longitude &&
        bounds[1].longitude >= point.longitude
      ) {
        return true;
      }
    }
    return false;
  }

}
