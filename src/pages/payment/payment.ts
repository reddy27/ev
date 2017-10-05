import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Addcard } from '../addcard/addcard';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
// @Component({
// 	templateUrl: 'details.html',
// })
// export class NavigationDetailsPage {
// 	item;
//
// 	constructor(params: NavParams) {
// 	this.item = params.data.item;
// 	}
// }

@Component({
	template: `
<ion-header>
	<ion-navbar>
	<ion-title>Payment</ion-title>
	</ion-navbar>
</ion-header>

<ion-content>
<h3 style="font-family: cursive;text-align: center;">Payment Methods</h3>

	<ion-list>
	<button ion-item *ngFor="let item of items" (click)="openNavDetailsPage(item)" icon-start>
				 <ion-icon [name]="item.icon"></ion-icon>
	 	{{ item.title }}
	</button>
	</ion-list>
</ion-content>
`
})
export class Payment {
	@ViewChild(Slides) slides: Slides;
	items = [];
	goToSlide() {
    this.slides.slideTo(2, 500);
  }

	constructor(public nav: NavController, public storage: Storage, ) {



		this.storage.get('canDrive').then((val) => {
			if(val === null){
				return;
			}else{
				this.items.push({
					title: val.cardNumber
				});
			}


   });

	this.items = [
		{
		'title': 'Add Payment Method',
		'description': '',
		'color': '#0CA9EA',
		'icon': 'card'
		},
		{
		'title': 'Paypal',
		'description': '',
		'color': '#0CA9EA'
		}
	]
	console.log('final', this.items);
	}

	openNavDetailsPage(item) {
		if(item.title === 'Add Payment Method'){
		    item.title = 'Add Payment';
				return;
	}
	if(item.title === 'Add Payment'){
		this.nav.push(Addcard, { item: item });
	}

	}

}
