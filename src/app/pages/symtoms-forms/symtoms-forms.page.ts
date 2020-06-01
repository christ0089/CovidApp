import { Component, OnInit } from "@angular/core";
import { questions, QuestionInterface, AnswerInterface } from "./questions";
import { ModalController, ToastController, Platform, LoadingController } from "@ionic/angular";
import { ResultPage } from "../result/result.page";
import { NavServiceService } from "src/app/services/nav-service.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@Component({
  selector: "app-symtoms-forms",
  templateUrl: "./symtoms-forms.page.html",
  styleUrls: ["./symtoms-forms.page.scss"],
})
export class SymtomsFormsPage implements OnInit {
  currentQuestions = questions;
  completedMatrix = new Array(questions.length * 2);
  currentIdx = 0;
  completed = [false, false];
  constructor(
    private modalController: ModalController,
    private database: AngularFireDatabase,
    private storage: Storage,
    private platform: Platform,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private navService: NavServiceService
  ) {}

  ngOnInit() {
    this.currentIdx = 0;
    this.currentQuestions = questions;
  }

  advance() {
    if (this.completed[0] === true && this.completed[1]  ===  true ) {
      this.completed = [false, false];
      this.currentIdx++;
    }else {
      this.presentToast('Favor de seleccionar, respuesta');
    }
  }

  confirm() {
    const flattenedArray: QuestionInterface[] = [].concat(
      ...this.currentQuestions
    );
    let totalWeight = 0;
    flattenedArray.forEach((question: QuestionInterface) => {
      question.answers.forEach((answer: AnswerInterface) => {
        if (answer.active === true) {
          totalWeight += answer.weight;
        }
      });
    });
    this.navService.setData(totalWeight);
    console.log(this.navService.getData());

    const time = (Math.floor(Math.random() * (3000 - 1000)) + 1000);
    this.presentLoader('Procesando', time);
    setTimeout(() => {
      const object = {data: flattenedArray, dateRevised: Date.now(), result: totalWeight, platform : this.platform.platforms()};
      this.database.database.ref().child('result').push(object).then((data) => {
        return this.storage.set(data.key, JSON.stringify(object));
      }).then(() => {
        this.currentIdx = 0;
        this.currentQuestions = questions;
        this.presentModal();
      }).catch(e => {
        console.log(e);
        this.presentModal();
      });
    }, time);
  }

  active(answer, indx, indx2) {
    console.log(answer);
    this.completed[indx] = true;
    if (this.currentQuestions[this.currentIdx][indx].multipleSelect) {
      if (answer.deselect) {
        this.currentQuestions[this.currentIdx][indx].answers.forEach(
          (answer) => {
            answer.active = false;
          }
        );
      }
      answer.active = !answer.active;
    } else {
      this.currentQuestions[this.currentIdx][indx].answers.forEach((answer) => {
        answer.active = false;
      });
      answer.active = !answer.active;
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ResultPage,
    });
    return await modal.present();
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      color : 'primary',
      position: 'bottom'
    });
  
    toast.present();
  }

  async presentLoader(message, timer) {
    const load = await this.loadCtrl.create({
      message: message,
      duration: timer,
    });
  
    load.present();
  }
}
