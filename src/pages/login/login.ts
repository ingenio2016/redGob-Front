import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';

import { UserService, UserModel, LocalStorage } from '../../providers/index.services';
import { MyApp } from '../../app/app.component';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string = "";
  contrasena:string = "";
  constructor( public navCtrl: NavController, public alertController: AlertController, public _userService: UserService, public _localStorage: LocalStorage, private _myApp: MyApp ) {
  }

  ingresar() {
    let data: UserModel[] = [];
    if(this.correo == "" || this.contrasena == ""){
      this.alertController.create({
        title: "Atención",
        subTitle: "Debe digitar un correo y una contraseña",
        buttons: ["OK"]
      }).present();
    }else{
      data = this._userService.login(this.correo, this.contrasena);
      if(data.length == 0){
        this.alertController.create({
          title: "Atención",
          subTitle: "El correo y/o contraseña son invalidos",
          buttons: ["OK"]
        }).present();
      }else{

        //Almaceno el Usuario en el LocalStorage
        this._localStorage.remove("user-profile");
        this._localStorage.setObject("user-profile", data[0]);
        this._myApp.loadOptions();
        this.navCtrl.setRoot(HomePage);
      }
    }
  }

}
