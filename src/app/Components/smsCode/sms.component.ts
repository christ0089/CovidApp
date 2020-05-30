import { Component, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { NavController, ToastController, Platform } from "@ionic/angular";
import { AngularFireFunctions } from "@angular/fire/functions";
import { EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

import { Router } from "@angular/router";
// import {
//   ScanParams,
//   BluetoothLE,
//   Characteristic,
//   Descriptor,
// } from "@ionic-native/bluetooth-le";

@Component({
  selector: "sms",
  templateUrl: "./sms.component.html",
  styleUrls: ["./sms.component.scss"],
})
export class SMSComponent implements OnInit {
  @Output() register: EventEmitter<any> = new EventEmitter();
  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private navController: NavController,
    private router: Router,
    private modalView: ToastController,
    private functions: AngularFireFunctions,
    //private bluetooth: BluetoothLE,
    private platform: Platform
  ) {
    this.userForm = this.formBuilder.group({
      smsCode: new FormControl("", [
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  ngOnInit() {}

  registerView() {
    this.auth
      .loginWithPhone(this.userForm.get("smsCode").value)
      .then((activated) => {
        console.log("User Sign In");
        this.initializeBlueetoothService();
        this.navController.navigateRoot("tabs");
      })
      .catch((e) => {
        console.error("Error");
        console.log(e);
        this.toastController(e);
      });
  }

  resend() {
    this.auth.resendSMS();
  }

  initializeBlueetoothService() {
    // this.platform.ready().then(async () => {
    //   const { status } = await this.bluetooth.initialize();
    //   if (status !== "enabled") {
    //     alert("Bluetooth in not enabled. Please enable it");
    //   }
    //   const { hasPermission } = await this.bluetooth.hasPermission();
    //   if (!hasPermission) {
    //     await this.bluetooth.requestPermission();
    //   }
    //   const { isLocationEnabled } = await this.bluetooth.isLocationEnabled();
    //   if (!isLocationEnabled) {
    //     await this.bluetooth.requestLocation();
    //   }
    // });
  }

  // startBluetoothScan() {
  //   const scanOpts: ScanParams = {
  //     allowDuplicates: true,
  //   };
  //   try {

  //     const charactersistics: Characteristic[] = [
  //       {
  //         uuid: `{id : ${this.auth.user.uid} }`,
  //         permissions: {
  //           read: true,
  
  //           //readEncryptionRequired: true,
  //           //writeEncryptionRequired: true,
  //         },
  //         properties: {
  //           read: true,
  //           notify: true,
  //           indicate: true,
  //           //authenticatedSignedWrites: true,
  //           //notifyEncryptionRequired: true,
  //           //indicateEncryptionRequired: true,
  //         },
  //       },
  //       {
  //         uuid: `{rs : 60 }`,
  //         permissions: {
  //           read: true,
  //           write: true,
  //           //readEncryptionRequired: true,
  //           //writeEncryptionRequired: true,
  //         },
  //         properties: {
  //           read: true,
  //           writeWithoutResponse: true,
  //           write: true,
  //           notify: true,
  //           indicate: true,
  //           //authenticatedSignedWrites: true,
  //           //notifyEncryptionRequired: true,
  //           //indicateEncryptionRequired: true,
  //         },
  //       },
  //       {
  //         uuid: `{v : 1 }`,
  //         permissions: {
  //           read: true,
  //           write: true,
  //           //readEncryptionRequired: true,
  //           //writeEncryptionRequired: true,
  //         },
  //         properties: {
  //           read: true,
  //           writeWithoutResponse: true,
  //           write: true,
  //           notify: true,
  //           indicate: true,
  //           //authenticatedSignedWrites: true,
  //           //notifyEncryptionRequired: true,
  //           //indicateEncryptionRequired: true,
  //         },
  //       },
  //     ];
  //     this.bluetooth.addService({
  //       service: "Perpheral Encounter Message",
  //       characteristics: [],
  //     });
  //     this.bluetooth.startScan(scanOpts).subscribe(
  //       (res) => {
  //         alert(JSON.stringify(res));
  //       },
  //       (err) => {
  //         alert(JSON.stringify(err));
  //       }
  //     );
  //   } catch (e) {
  //     alert("Error in start scan");
  //     alert(JSON.stringify(e));
  //   }
  // }

  async toastController(e) {
    const toast = await this.modalView.create({
      message: `Error: ${e}`,
      color: "warning",
      duration: 2000,
    });
    toast.present();
  }
}
