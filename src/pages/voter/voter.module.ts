import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoterPage } from './voter';

@NgModule({
  declarations: [
    VoterPage,
  ],
  imports: [
    IonicPageModule.forChild(VoterPage),
  ],
  exports: [VoterPage]
})
export class VoterPageModule {}
