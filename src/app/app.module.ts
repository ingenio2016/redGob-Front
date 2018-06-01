// Angular
import { NgModule, ErrorHandler, Injector } from '@angular/core'; // tslint:disable-line
import { BrowserModule } from '@angular/platform-browser';

// Ionic
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// App
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Custom components
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { HttpModule } from '@angular/http';

//providers
import { UserService } from '../providers/user/user';
import { LocalStorage } from '../providers/local-storage/local-storage';

@NgModule({
  declarations: [MyApp, SideMenuContentComponent, HomePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar, SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService, LocalStorage
  ]
})
export class AppModule {
  // Make the injector to be available in the entire module
  // so we can use it in the custom decorator
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
