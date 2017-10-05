import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Landingpage } from './landingpage';

@NgModule({
  declarations: [
    Landingpage,
  ],
  imports: [
    IonicPageModule.forChild(Landingpage),
  ],
  exports: [
    Landingpage
  ]
})
export class LandingpageModule {}
