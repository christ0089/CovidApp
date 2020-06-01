import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { GoogleMapsProvider } from "src/app/services/google-maps/google-maps";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform, NavController } from "@ionic/angular";
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"],
})
export class MapPage {
  @ViewChild("googleMaps", { static: false }) mapRef: ElementRef;
  Map: any;

  constructor(
    private googleMaps: GoogleMapsProvider,
    private geolocation: Geolocation,
    private platform: Platform,
    private router: NavController,
    private auth: AuthService,
  ) {}

  ngOnInit() {
   // Loads the Map data of the User
    this.platform.ready().then(() => {
      console.log(this.mapRef);
      this.showMap();
    });
  }

  navigate() {
    this.router.navigateRoot('auth');
  }

  logout() {
    this.auth.signOut();
  }

  showMap() {
    let lat = 25.5786925;
    let lon = -103.4027008;
    console.log(this.platform.platforms());
    console.log(this.mapRef.nativeElement);
    if (this.platform.is("ios") || this.platform.is("android")) {
      console.log("Load Map");
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {

          lat = resp.coords.latitude;
          lon = resp.coords.longitude;
          const location = new google.maps.LatLng(lat, lon);
          const options = {
            center: location,
            zoom: 10,
          };
          this.Map = new google.maps.Map(this.mapRef.nativeElement, options);
          this.googleMaps.getMarkers(this.Map, lat, lon).toPromise();
         
        })
        .catch((error) => {
          console.log("Error getting location", error);
        });
    } else {
      const location = new google.maps.LatLng(lat, lon);
      const options = {
        center: location,
        zoom: 10,
      };
      setTimeout(() => {
        console.log(this.mapRef.nativeElement);
        this.Map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.googleMaps.getMarkers(this.Map, lat, lon).subscribe(() => {});
      }, 1000);
    }

  }
}
