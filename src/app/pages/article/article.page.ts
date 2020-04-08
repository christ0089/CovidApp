import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NavServiceService } from "src/app/services/nav-service.service";
import { article } from "src/app/Models/iArticle";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: "app-article",
  templateUrl: "./article.page.html",
  styleUrls: ["./article.page.scss"],
})
export class ArticlePage implements OnInit {
  article: article = {
    title: "Titulo",
    description: "",
  };
  constructor(
    private modalController: ModalController,
    private socialSharing: SocialSharing,
    private navService: NavServiceService
  ) {
    this.article = this.navService.getData<article>();
  }

  ngOnInit() {}

  shareButton() {
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    const options = {
      message: this.article.title, // not supported on some apps (Facebook, Instagram)
      subject: this.article.description, // fi. for email
      chooserTitle: "COVID-19", // Android only, you can override the default share sheet title
     // appPackageName: "com.apple.social.facebook", // Android only, you can provide id of the App you want to share with
    };

    const onSuccess = function (result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };

    const onError = function (msg) {
      console.log("Sharing failed with message: " + msg);
    };

    this.socialSharing.shareWithOptions(options);
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
