// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { LogoutPage } from './logout';

@NgModule({
  declarations: [
    LogoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPage),
  ],
  exports: [LogoutPage]
})
export class LogoutPageModule {}
