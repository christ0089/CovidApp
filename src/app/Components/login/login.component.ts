import { Component, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import { NavController, Platform, ToastController } from "@ionic/angular";
import { AngularFireFunctions } from "@angular/fire/functions";
import { EventEmitter } from "@angular/core";

import { Router } from "@angular/router";
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() register: EventEmitter<any> = new EventEmitter();
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private firebaseX: FirebaseX,
    private platform: Platform,
    private navController: Router,
    private modalView: ToastController,
    private navService: NavController,
    private auth: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      phone: new FormControl("", [
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.required
      ])
    });
  }

  ngOnInit() {}

  sendSMSCode() {
    const phoneNumberString = "+52" + this.userForm.get("phone").value;
    console.log(this.platform.platforms());
    console.log(phoneNumberString);
    if (this.platform.is("desktop") === true && !this.platform.is('android')) {
      this.navController.navigate(["auth/sms"]);
      return;
    }
    this.auth.sendSMS(phoneNumberString);
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
