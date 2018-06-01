import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SideMenuDisplayText } from '../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

/**
 * Generated class for the BossPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boss',
  templateUrl: 'boss.html',
})
@SideMenuDisplayText('Jéfes')
export class BossPage {
  bossesList: Boss [] = [];
  constructor(public navCtrl: NavController) {
  }
}
