import { Component, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  NavController,
  Platform,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { AngularFireFunctions } from '@angular/fire/functions';
import { finalize, tap, takeUntil, take, first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  register = true;
  loading: any;
  constructor(
    private formBuilder: FormBuilder,
    private functions: AngularFireFunctions,
    private firebase: FirebaseX,
    private platform: Platform,
    private loadingController: LoadingController,
    private navController: Router,
    private navService: NavController,
    private modalView: ToastController,
    private auth: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      phone: new FormControl('', [
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.required
      ]),
    });
  }

  ngOnInit() {}

  registerForm() {
    this.loadView();


    const functionCall = this.functions.httpsCallable('userValidate');
    functionCall({
      phone: '+52' + this.userForm.get('phone').value,
    })
      .pipe(
        take(1),
      )
      .subscribe(
        async result => {
          console.log(result);
          if (result.success === 200) {
            this.sendSMSCode();
          } else {
            const toast = await this.modalView.create({
              message: 'Error: No se pudo registrar al usuario.',
              color: 'warning',
              duration: 2000
            });
            toast.present();
          }
        }
      );
  }

  sendSMSCode() {
    const phoneNumberString = '+52' + this.userForm.get('phone').value;
    this.loading.dismiss();
    console.log(this.platform.platforms());
    if (this.platform.is('mobileweb') === true) {
      this.navController.navigate(['auth/sms']);
      return;
    }
    this.auth.sendSMS(phoneNumberString);
  }

  async loadView() {
    this.loading = await this.loadingController.create({
      message: 'Registrando',
      duration: 1500
    });
    await this.loading.present();
  }

}
