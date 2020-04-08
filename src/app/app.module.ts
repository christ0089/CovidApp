import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ResultPageModule } from './pages/result/result.module';
import { ArticlePageModule } from './pages/article/article.module';
import { NavServiceService } from './services/nav-service.service';
import { TokenService } from './services/token.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { GoogleMapsProvider } from './services/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';


export const firebaseConfig = environment.firebaseConst;
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ResultPageModule,
    ArticlePageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    FirebaseX,
    NavServiceService,
    GoogleMapsProvider,
    Geolocation,
    TokenService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
