import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ToastController, ModalController } from '@ionic/angular';
import { iresult } from 'src/app/Models/iResults';
import { Observable, from } from 'rxjs';
import { ResultPage } from '../result/result.page';
import { NavServiceService } from 'src/app/services/nav-service.service';

@Component({
  selector: "app-temperature",
  templateUrl: "./temperature.page.html",
  styleUrls: ["./temperature.page.scss"],
})
export class TemperaturePage implements OnInit {
  data = [];
  qr: Observable<iresult>;
  constructor(
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    private modalController: ModalController,
    private navService: NavServiceService,
    private snackBar: ToastController
  ) {}

  ngOnInit() {
    // const data = this.storage.
  }

  ionViewDidEnter() {
    this.data = [];
    this.storage.keys().then((keys) => {
      console.log(keys);
      // this.data = this.storage
      keys.forEach(async (key, i) => {
        if (i == 0) {
          this.qr = from(this.storage.get(key));
        }
        let data = await this.storage.get(key);
        this.data.push(JSON.parse(data) as iresult);
        console.log(this.data);
      });
    });
  }

  scanCodeV2() {
    this.barcodeScanner.scan({formats: 'QR_CODE'}).then((data) => {
      const result = JSON.parse(data.text) as iresult;
      this.navService.setData(result);
      this.presentModal();
    }).catch(e => {
      this.snackBar.create({
        message: e,
        color: "warning",
        duration: 1000000
      }).then((data) => {
        data.present();
      });
    });
  }
  
  async presentModal() {
    const modal = await this.modalController.create({
      component: ResultPage,
    });
    return await modal.present();
  }

}
