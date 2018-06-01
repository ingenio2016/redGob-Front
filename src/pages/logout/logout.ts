import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SideMenuDisplayText } from '../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';

import { LocalStorage } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
@SideMenuDisplayText('Salir')

export class LogoutPage {
  showSplash = true;

  constructor(public _navCtrl: NavController, public alertCtrl: AlertController, public _localStorage: LocalStorage) {
    const confirm = this.alertCtrl.create({
      title: 'Salír de la aplicación',
      message: '¿Está seguro que desea salír?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this._navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this._localStorage.remove("user-profile");
            setTimeout(() => {
              this.showSplash = false;
              this._navCtrl.setRoot(LoginPage);
            }, 1000);
          }
        }
      ]
    });
    confirm.present();
  }
}
