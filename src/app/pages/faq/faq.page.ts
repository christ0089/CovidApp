import { Component, OnInit } from '@angular/core';
import {faq} from './faq'
import { ModalController } from '@ionic/angular';
import { ArticlePage } from '../article/article.page';
import { NavServiceService } from 'src/app/services/nav-service.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  questions = faq;
  constructor(
    private modalController: ModalController,
    private navService: NavServiceService)
     { }

  ngOnInit() {
  }

  async presentModal(question) {
    const modal = await this.modalController.create({
      component: ArticlePage,
    });
    this.navService.setData(question.article);
    return await modal.present();
  }

}
