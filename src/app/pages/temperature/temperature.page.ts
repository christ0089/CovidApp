import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-temperature",
  templateUrl: "./temperature.page.html",
  styleUrls: ["./temperature.page.scss"],
})
export class TemperaturePage implements OnInit {
  data = [];
  constructor(private storage: Storage) {}

  ngOnInit() {
   
    // const data = this.storage.
  }

  ionViewDidEnter() {
    this.data = [];
    this.storage.keys().then((keys) => {
      console.log(keys);
      // this.data = this.storage
      keys.forEach(async (key) => {
        let data = await this.storage.get(key);
        this.data.push(JSON.parse(data));
        console.log(this.data);
      });

    });
  }
}
