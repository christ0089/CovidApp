import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthPage } from "./auth.page";
import { RegisterComponent } from "../../Components/register/register.component";
import { LoginComponent } from "../../Components/login/login.component";
import { SMSComponent } from "../../Components/smsCode/sms.component";

const routes: Routes = [
  {
    path: "",
    component: AuthPage,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: 'sms',
        component: SMSComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {}
