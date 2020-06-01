import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  login = true;
  constructor(
    private auth: AuthService,
    private  router: NavController
  ) { 
    this.auth.signOut();
  }

  ngOnInit() {

  }

  navigate() {
    this.router.navigateRoot('tabs');
  }


}
