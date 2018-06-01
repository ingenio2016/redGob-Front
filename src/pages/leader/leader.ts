import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SideMenuDisplayText } from '../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';
/**
 * Generated class for the LeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leader',
  templateUrl: 'leader.html',
})
@SideMenuDisplayText('Líderes')

export class LeaderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
