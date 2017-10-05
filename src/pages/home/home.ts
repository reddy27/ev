import { Component } from '@angular/core';
import { NavController,  ToastController} from 'ionic-angular';
import { Landingpage } from '../landingpage/landingpage';
// import { PaymentPage } from '../payment/payment';
// import { ContactPage } from '../contact/contact';

import { LoadingController } from 'ionic-angular';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Settings } from '../settings/settings';

import 'rxjs/add/operator/map';


//http://localhost:8100/api/users/login
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	styles: [`input.ng-invalid{border:2px solid red}input.ng-valid{border:rgb(204, 204, 204);}input.ng-pristine{border:rgb(204, 204, 204);}`],
	styleUrls: ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css']
})
export class HomePage {
	loader: any;
 show_logo = false;
    //  $timeout(function() {
    //      $scope.$apply('show_logo = true');
    //  }, 2000);

	
	// constructor(public navCtrl: NavController, public loadingCtrl: LoadingController ) {
	//
	// }
	// nextPage() {
	// 	 let loading = this.loadingCtrl.create({
	// content: 'Authenticating...'
	// });
	//
	// loading.present();
	//
	// setTimeout(() => {
	// loading.dismiss();
	// this.navCtrl.push(Landingpage);
	// }, 1000);
	//
	// }

goToLandingPage(){
	 	this.navCtrl.push(Landingpage);
}
loginOrRegister = "login";
	 show: boolean = true;
	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private http: Http,
	private toastCtrl: ToastController, public storage: Storage) {

	}



	 /*loginUser(value) {
	console.log('value', value);
		var CORSHeaders = new Headers();
	    CORSHeaders.append('Content-Type', 'application/json');

		 this.http.post('http://ec2-52-14-217-199.us-east-2.compute.amazonaws.com:9000/api/users/login',  value, {headers: CORSHeaders}).subscribe(data => {
		 	console.log(data);
		 	this.navCtrl.push(Landingpage);
		 	//alert('ok');
		 }, error => {
		 let toast = this.toastCtrl.create({
		    message: 'User was added successfully',
		    duration: 3000,
		    position: 'top'
		  });


		 	//console.log(error.json());
		 });
	}*/

onSubmit(form: any, storage: Storage): void {
console.log('you submitted value:', form);
		var CORSHeaders = new Headers();
	    CORSHeaders.append('Content-Type', 'application/json');
	  //http://ec2-52-14-217-199.us-east-2.compute.amazonaws.com:9000/api/users/login

		 this.http.post('http://localhost:9000/api/users/login',  form, {headers: CORSHeaders}).subscribe(data => {
			 const res = data.json();
			 const drive = res.user.elgibility.driveEligibility;
			 console.log(drive);
			 this.storage.set('canDrive', drive);
		 	this.navCtrl.push(Landingpage);
		 }, error => {
			  let toast = this.toastCtrl.create({
				message: 'Please correct username/password',
				duration: 3000,
				position: 'top'
			  });

			  toast.onDidDismiss(() => {
				console.log('Dismissed toast');
			  });

			  toast.present();
		 });


	  }

	/*register(value){
		var CORSHeaders = new Headers();
	    CORSHeaders.append('Content-Type', 'application/json');

		 this.http.post('http://localhost:5000/api/users',  value, {headers: CORSHeaders}).subscribe(data => {
		 	console.log('success');
		 	//this.navCtrl.push(Landingpage);
		 	//alert('ok');
		 }, error => {


		 });
	}*/

}
