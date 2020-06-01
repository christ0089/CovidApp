import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth/auth";
import { AngularFireDatabase } from "@angular/fire/database";

import { map } from "rxjs/operators";
import { ArticlePage } from "../article/article.page";
import { ModalController } from "@ionic/angular";

import { createAnimation } from "@ionic/core";
import { NavServiceService } from 'src/app/services/nav-service.service';

@Component({
  selector: "app-main-feed",
  templateUrl: "./main-feed.page.html",
  styleUrls: ["./main-feed.page.scss"],
})
export class MainFeedPage implements OnInit {
  articles$: Observable<any>;
  healthStatus = null;
  constructor(
    private db: AngularFireDatabase,
    private navService: NavServiceService,
    private modalController: ModalController
  ) {
    this.articles$ = this.db
      .list(`Articulos`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => ({
            key: action.key,
            ...action.payload.exportVal(),
          }))
        )
      );
    this.articles$.subscribe((trans) => {
      console.log(trans);
    });
  }

  ngOnInit() {}

  
  goodHealth() {
    console.log("check");
    this.healthStatus = true;
    const animation = createAnimation()
    .addElement(document.querySelector(".result"))
    .easing("ease-in-out")
    .duration(1000)
    .direction("alternate")
    .keyframes([
      { offset: 0, opacity: "0" },
      { offset: 1, opacity: "1" }
    ]);

    animation.play();
  }

  


 

  async presentModal(article) {
    const modal = await this.modalController.create({
      component: ArticlePage,
    });
    this.navService.setData(article);
    return await modal.present();
  }
}
