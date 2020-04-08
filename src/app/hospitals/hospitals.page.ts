import { Component, OnInit } from '@angular/core';
import { InterfaceCenter, CENTER_STATUS, Center } from '../Models/iCenters';
import { NavServiceService } from '../services/nav-service.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.page.html',
  styleUrls: ['./hospitals.page.scss'],
})
export class HospitalsPage implements OnInit {
  hospital = null;
  constructor(
    private navService: NavServiceService
  ) { 

  }

  ngOnInit() {
    this.hospital = this.navService.getData<InterfaceCenter>();
  }

}
