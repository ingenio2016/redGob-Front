// Angular
import { Component, ViewChild } from '@angular/core';

// RxJS
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ArrayObservable } from "rxjs/observable/ArrayObservable";

// Ionic
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Side Menu Component
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';
import { SideMenuOption } from './../shared/side-menu-content/models/side-menu-option';
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';

import { UserModel } from '../providers/user/user';
import { LocalStorage } from '../providers/local-storage/local-storage';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) navCtrl: Nav;

	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	public rootPage: any = 'LoginPage';

	userProfile: UserModel = null;

	// Options to show in the SideMenuContentComponent
	public options: Array<SideMenuOption>;

	// Settings for the SideMenuContentComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option'
	};

	private unreadCountObservable: any = new ReplaySubject<number>(0);

	constructor(private platform: Platform,
				private statusBar: StatusBar,
				private splashScreen: SplashScreen,
				private alertCtrl: AlertController,
				private menuCtrl: MenuController,
				private _localStorage: LocalStorage) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleLightContent();
			this.splashScreen.hide();

			// Initialize some options
			this.initializeOptions();
		});

		// Change the value for the batch every 5 seconds
		setInterval(() => {
			this.unreadCountObservable.next(Math.floor(Math.random() * 10) + 1);
		}, 5000);

	}

	private initializeOptions(): void {
		this.options = new Array<SideMenuOption>();
	}

	public loadOptions(): void {
		//Load User profile
		this.userProfile = this._localStorage.getObject('user-profile');
		// Load simple menu options
		if(this.userProfile.Profile == "Jéfe" || this.userProfile.Profile == "Administrador"){
			this.options.length = 0;
			this.options = [];
			this.options.push({
				displayText: 'Jefes',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Jéfes',
						component: 'BossPage'
					}
				]
			});

			this.options.push({
				displayText: 'Enlaces',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Enlaces',
						component: 'LinkPage'
					}
				]
			});

			this.options.push({
				displayText: 'Coordinadores',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Coordinadores',
						component: 'CoordinatorPage'
					}
				]
			});

			this.options.push({
				displayText: 'Líderes',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Líderes',
						component: 'LeaderPage'
					}
				]
			});

			this.options.push({
				displayText: 'Votantes',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Votantes',
						component: 'VoterPage'
					}
				]
			});
		}

		if(this.userProfile.Profile == "Enlace"){
			this.options.length = 0;
			this.options = [];
			this.options.push({
				displayText: 'Coordinadores',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Coordinadores',
						component: 'CoordinatorPage'
					}
				]
			});

			this.options.push({
				displayText: 'Líderes',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Líderes',
						component: 'LeaderPage'
					}
				]
			});

			this.options.push({
				displayText: 'Votantes',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Votantes',
						component: 'VoterPage'
					}
				]
			});
		}

		if(this.userProfile.Profile == "Coordinador"){
			this.options.length = 0;
			this.options = [];
			this.options.push({
				displayText: 'Líderes',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Líderes',
						component: 'LeaderPage'
					}
				]
			});

			this.options.push({
				displayText: 'Votantes',
				suboptions: [
					{
						iconName: 'people',
						displayText: 'Listado de Votantes',
						component: 'VoterPage'
					}
				]
			});
		}

		// Load special options
		// -----------------------------------------------
		this.options.push({
			iconName: 'exit',
			displayText: 'Salir',
			component: 'LogoutPage',
		});
	}

	public onOptionSelected(option: SideMenuOption): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Get the params if any
				const params = option.custom && option.custom.param;
				// Redirect to the selected page
				this.navCtrl.setRoot(option.component);
			}
		});
	}

	public collapseMenuOptions(): void {
		this.sideMenu.collapseAllOptions();
	}

	public presentAlert(message: string): void {
		let alert = this.alertCtrl.create({
			title: 'Information',
			message: message,
			buttons: ['Ok']
		});
		alert.present();
	}

}
