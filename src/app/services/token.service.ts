import { Injectable } from "@angular/core";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { Platform } from "@ionic/angular";
import { AngularFireDatabase } from "@angular/fire/database";
@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(
    private firebaseX: FirebaseX,
    private platform: Platform,
    private database: AngularFireDatabase
  ) {
    console.log("Firebase Token Retrieval");

    this.firebaseX
      .onMessageReceived()
      .subscribe((data) => console.log(`User opened a notification ${data}`));

    this.firebaseX
      .onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

  getToken() {
    if (this.platform.is("ios") || this.platform.is("android")) {
      this.firebaseX
        .getToken()
        .then((token) => {
          console.log(`The token is ${token}`);
          this.database.database
            .ref()
            .child("Notification")
            .push({ tokenId: token });
        }) // save the token server-side and use it to push notifications to this device
        .catch((error) => console.error("Error getting token", error));
    }
  }
}
