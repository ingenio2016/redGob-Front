// Angular
import { Component } from '@angular/core';

// Ionic
import { NavController, IonicPage } from "ionic-angular";

// Side Menu Component
import { SideMenuDisplayText } from '../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

import { UserModel } from '../../providers/user/user';

import { LocalStorage } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
@SideMenuDisplayText('Home')
export class HomePage {
	profile:UserModel [] = [];
	nombre:string = "";
	cargo:string = "";
	constructor(private navCtrl: NavController, public _localStorage: LocalStorage) {
		this.profile.push(this._localStorage.getObject('user-profile'));
	}

	public goToOption(): void {
		this.navCtrl.setRoot('OptionOnePage');
	}

	public goToSubOption(): void {
		this.navCtrl.setRoot('SubOptionTwoPage');
	}
}
