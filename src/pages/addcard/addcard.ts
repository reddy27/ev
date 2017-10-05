import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Payment } from '../payment/payment';
/**
 * Generated class for the Addpayment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addpayment',
  templateUrl: 'addcard.html',
})
export class Addcard {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }
  onSubmit(form: any): void {
    this.storage.set('canDrive', form);
     this.navCtrl.push(Payment);

	}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Addpayment');
  }

}
