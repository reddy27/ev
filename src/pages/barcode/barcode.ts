import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Barcode page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class Barcode {
val:any;
result1:any;
imgsrc:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }


  ionViewDidLoad() {
    this.getLocation();
  }
  getLocation(){
    this.storage.get('whereToGo').then((val) => {
      if(val){
        this.imgsrc="https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=h%7c1&chl=" + "wheretogo" + val.origin +"andDest "+ val.dest;
          //this.imgsrc="https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=h%7c1&chl=wheretogoChIJ86V7GXT0j4ARbMMDIJdJbuAandDestEiRCYXJ0IFdheSwgRnJlbW9udCwgQ0EsIFVuaXRlZCBTdGF0ZXM"


      }else{
        this.imgsrc="https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=h%7c1&chl=";
      }
   });
  }

//&wheretogo=val.orgin"+"&"+"val.dest
  //  imgsrc="https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=h%7c1&chl=" + "wheretogo" + this.val.orgin +"&"+ this.val.dest;

}
