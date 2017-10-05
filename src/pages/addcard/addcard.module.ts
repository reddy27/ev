import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Addcard } from './addcard';

@NgModule({
  declarations: [
    Addcard,
  ],
  imports: [
    IonicPageModule.forChild(Addcard),
  ],
  exports: [
    Addcard
  ]
})
export class AddcardModule {}
