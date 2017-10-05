import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ContactPage } from '../contact/contact';
import { Payment } from '../payment/payment';

/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-about',
	templateUrl: 'settings.html',
})
export class Settings {
	data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];

 	items = [
		{
			title: 'Home',
			icon: 'home-outline',
			color: 'rgb(114, 10, 251)'
		},
		{
			title: 'Payment',
			icon: 'card',
			color: 'rgb(114, 10, 251)'
		},
		{
			title: 'Help',
			icon: 'help',
			color: 'rgb(114, 10, 251)'
		},
		{
			title: 'Drive',
			icon: 'car',
			color: 'rgb(114, 10, 251)'
		},
		{
			title: 'Invite friends',
			icon: 'invite',
			color: 'rgb(114, 10, 251)'
		},
		{
			title: 'Free Rides',
			icon: 'free',
			color: 'rgb(114, 10, 251)'
		},
		{
			title: 'Legal',
			icon: 'legal',
			color: 'rgb(114, 10, 251)'
		},
	];


 itemSelected(items: any) {
	 if(items.title === "Payment"){
		 this.navCtrl.push(Payment);
	 }
	}



	constructor(public navCtrl: NavController, public navParams: NavParams) {


		/*for(let i = 0; i < 5; i++ ){
		this.data.push({
			title: 'Title '+i,
			details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			icon: 'ios-add-circle-outline',
			showDetails: false
		});
	}*/
	}
	/* toggleDetails(data) {
		 console.log(data);
	if (data.showDetails) {
		data.showDetails = false;
		data.icon = 'ios-add-circle-outline';
	} else {
		data.showDetails = true;
		data.icon = 'ios-remove-circle-outline';
	}
	}*/
	ionViewDidLoad() {
	console.log('ionViewDidLoad About');
	}

}
