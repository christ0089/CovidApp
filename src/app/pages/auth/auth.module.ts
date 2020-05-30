import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LoginComponent } from '../../Components/login/login.component';
import { RegisterComponent } from '../../Components/register/register.component';
import { SMSComponent } from '../../Components/smsCode/sms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    AuthPageRoutingModule
  ],
  declarations: [
    AuthPage,
    LoginComponent,
    RegisterComponent,
    SMSComponent
  ],
  providers: [
  ]
})
export class AuthPageModule {}
