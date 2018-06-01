import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SideMenuDisplayText } from '../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

/**
 * Generated class for the LinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link',
  templateUrl: 'link.html',
})
@SideMenuDisplayText('Enlaces')
export class LinkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
