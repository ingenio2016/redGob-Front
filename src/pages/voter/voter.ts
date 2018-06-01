import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SideMenuDisplayText } from '../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

/**
 * Generated class for the VoterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voter',
  templateUrl: 'voter.html',
})
@SideMenuDisplayText('Votantes')

export class VoterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
