import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';


@Injectable()
export class AuthService {
  public user: firebase.User;
  public token: string;
  userData: any;
  verificationId: any;
  user$: Observable<any>;
  userData$: Observable<any>;
  auth: any;
  private phone = '';

  constructor(
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private navService: Router,
    private modalView: ToastController,
    private firebaseX: FirebaseX,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      tap(user => {
        if (user == null) {
          console.log('Logout');
          this.signOut();
          return;
        } else {
          console.log('User was logged in');
          this.user = this.afAuth.auth.currentUser;
        }
      })
      );
    //
    this.user$.subscribe();
  }

  public async loginWithPhone(code: string) {
    // if (this.platform.is('desktop') === true) {
    //   console.log('Desktop Auth');
    //   return this.afAuth.auth
    //     .signInWithEmailAndPassword('christianalva96@gmail.com', '123456789')
    //     .then(user => {
    //       console.log(user);
    //       return this.userService.loadUserData(this.user.uid).toPromise();
    //     })
    //     .then(userData => {
    //       console.log(userData.data().activated);
    //       this.userData = userData.data();
    //       return userData.data().activated;
    //     });
    // }
    const signInCredential = await firebase.auth.PhoneAuthProvider.credential(
      this.verificationId,
      code
    );
    console.log(signInCredential);
    return firebase
      .auth()
      .signInWithCredential(signInCredential)
      .then(user => {
        console.log(user);
        this.user = user.user;
      //   return this.userService.loadUserData(user.user.uid).toPromise();
       })
      // .then(userData => {
      //   console.log(userData.data().activated);
      //   this.userData = userData.data();
      //   return userData.data().activated;
      // });
  }

  instantVerificationSignIn(credential) {
    return firebase
    .auth()
    .signInWithCredential(credential)
    .then(user => {
      this.user = user.user;
    //   console.log(user);
    //  // return this.userService.loadUserData(user.user.uid).toPromise();
    })
    // .then(userData => {
    //   console.log(userData.data().activated);
    //   this.userData = userData.data();
    //   return userData.data().activated;
    // });
  }

  signOut() {
    this.user = null;
    return this.afAuth.auth.signOut();
  }

  resendSMS() {
    this.sendSMS();
  }

  sendSMS(phoneNumberString = this.phone) {
    this.phone = phoneNumberString;
    this.firebaseX
    .verifyPhoneNumber((credential: any) => {
      console.log('Verification Id');
      console.log(credential);
      if (this.platform.is('ios')) {
        this.verificationId = credential.verificationId;
      } else {
        this.verificationId = credential.verificationId;
      }
      console.log(this.auth);

      if (credential.instantVerification == 'true') {
        this.instantVerificationSignIn(credential).then((activated) => {
          console.log(activated);
          // if (
          //   activated === false ||
          //   activated == null
          // ) {
          //   this.navController.navigateRoot('select-credit');
          // } else {
          //   this.navController.navigateRoot('tabs');
          // }
        }).catch((e) => {
          this.toastController();
        });
      }
      this.navService.navigate(['auth/sms']);
    }, err => {
      console.error('SMS not sent' + JSON.stringify(err));
      this.toastController();

    }, phoneNumberString, 60);
  }

  async toastController() {
    const toast = await this.modalView.create({
      message: 'Error: No se pudo mandar el SMS.',
      color: 'warning',
      duration: 2000
    });
    toast.present();
  }
}
