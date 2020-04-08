import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private tokenService: TokenService) {
    this.tokenService.getToken();
  }
}
