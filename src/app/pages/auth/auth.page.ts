import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  login = true;
  constructor(
    private auth: AuthService
  ) { 
    this.auth.signOut();
  }

  ngOnInit() {

  }


}
