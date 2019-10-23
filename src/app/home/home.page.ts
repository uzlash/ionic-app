// import { Component } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import {InputModalPage} from '../input-modal/input-modal.page'

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   constructor(public modalController: ModalController) {}

//   async openModal() {
//     const modal = await this.modalController.create({
//       component: InputModalPage
//     });
//     return await modal.present();
//   }
// }

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {InputModalPage} from '../input-modal/input-modal.page'


import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  students: any;
  userID: null;

  constructor(
    public modalController: ModalController,

    private http: HttpClient,
    public alertController: AlertController
    ) { this.getStudents(); } // end of constructor

  async openModal() {
    const modal = await this.modalController.create({
      component: InputModalPage,

      componentProps: {
        "userID": this.userID
      }
    });

    modal.onDidDismiss().then( () => {
      this.getStudents();
      this.userID = null;
    });

    return await modal.present();
  }

  getStudents() {
    this.http.get('https://click-on-kaduna.herokuapp.com/api/student').subscribe((response) => {
      const res: any = response;
      this.students = res.data;
    });
  }

  edit(id) {
    this.userID = id;
    this.openModal();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
