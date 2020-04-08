import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { NavServiceService } from "src/app/services/nav-service.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.page.html",
  styleUrls: ["./result.page.scss"],
})
export class ResultPage implements OnInit {
  healthy_check = false;
  title = {
    0: "Caso no sospechoso, sigue con los cuidados listados abajo.",
    1: "Posbile caso, porfavor realize un sautodiagnostico en dos dias",
    2: "Urgente, caso sospechoso puedes estar en peligro.",
  };

  state = 0;
  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private navService: NavServiceService
  ) {
    console.log(this.navService.getData());
    if (this.navService.getData() > 10) {
      this.healthy_check = false;
      this.state = 1;
      if (this.navService.getData() > 15) {
        this.state = 2;
      }
    } else {
      this.healthy_check = true;
      this.state = 0;
    }
  }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    this.modalController.dismiss(onClosedData).then(() => {
      this.navController.navigateBack('tabs/temperature');
    });
    
  }
}
