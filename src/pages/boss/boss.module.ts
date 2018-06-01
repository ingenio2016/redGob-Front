import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BossPage } from './boss';

@NgModule({
  declarations: [
    BossPage,
  ],
  imports: [
    IonicPageModule.forChild(BossPage),
  ],
  exports: [BossPage]
})
export class BossPageModule {}
