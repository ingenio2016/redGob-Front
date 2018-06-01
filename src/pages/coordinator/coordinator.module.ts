import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoordinatorPage } from './coordinator';

@NgModule({
  declarations: [
    CoordinatorPage,
  ],
  imports: [
    IonicPageModule.forChild(CoordinatorPage),
  ],
  exports: [CoordinatorPage]
})
export class CoordinatorPageModule {}
