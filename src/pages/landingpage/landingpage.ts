import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
//import { AboutPage} from '../about/about'
import { Barcode} from '../barcode/barcode'
import { Settings } from '../settings/settings';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the Contact page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;
@Component({
	selector: 'landingpage',
	templateUrl: 'landingpage.html',
})
export class Landingpage {
	options: BarcodeScannerOptions;
	results: {};
	public hideScan: boolean;
  public qrcode: boolean;
 public ScrollLatLng : object;

 @ViewChild('map') mapElement: ElementRef;
		map: any; x: any;
		originPlaceId: any;
		destinationPlaceId:any;
		travelMode:any;
		directionsService:any;
		directionsDisplay:any;
		location: object;
		loginObj: object;
		tempToken: any;

	constructor(public navCtrl: NavController,
							public navParams: NavParams,
							private barcode:BarcodeScanner,
		          public storage: Storage,
							public geolocation: Geolocation,
						  public http: Http) {
	}
	getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(this.geoSuccess);
		}
	}
	geoSuccess(position){
		var lat = position.coords.latitude;
	  var lng = position.coords.longitude;
	}

	ionViewDidLoad() {
	 this.getLocation();
   this.loadMap();
	 this.initMap();
}

login() {
	let postData = {
				"username": "pramod",
				"password" : "pramod123"
			};
				var CORSHeaders = new Headers();
					CORSHeaders.append('Content-Type', 'application/json');
								this.http.post('https://evoint.herokuapp.com/user/login',
								postData, {headers: CORSHeaders}).subscribe(data => {
								this.loginObj = data;
								this.getMarkers();
								if(navigator.geolocation){
									 navigator.geolocation.getCurrentPosition(position => {
										 this.location = position.coords;
										 //this.getLocationSpecifc(position.coords);
									 });
								}

	 });
 }
  loadMap() {
      // this.geolocation.getCurrentPosition().then((position) => {
      //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			// 	//console.log('land', position.coords.latitude);
      //   let mapOptions = {
      //     center: latLng,
      //     zoom: 15,
      //     mapTypeId: google.maps.MapTypeId.ROADMAP
      //   }
      // }, (err) => {
      //   console.log(err);
      // });
    }

ngOnInit(){
	this.login();
 if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			this.location = position.coords;
			this.getUserLocation (this.location);
		});
 }
}
// var postLeavingTime = (val)  => {
 getUserLocation =  (userLatLng) => {
	 if(userLatLng){

	 }
	 return userLatLng;
}



		initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          	mapTypeControl: false,
						draggable:true,
          center: {
						lat: 37.370196, ////37.6949598789713 37.68565481996576
						lng: -122.003932 //-121.86402454850463 -121.90990105149535
					},
          zoom: 4
        });


			// 	var userMarker = new google.maps.Marker({
			// 		position: {
			// 		lat: 37.6949659,lng:-121.8868977
			// 		},
			// 	   icon: '../assets/icon/G.png',
			// 	map: map
			// });


			navigator.geolocation.getCurrentPosition(position => {
				this.location = position.coords;
			var	latLng = {
					latitude : position.coords.latitude,
					longitude: position.coords.longitude
				}

			 map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
			 map.setZoom(10);

			});

     	this.AutocompleteDirectionsHandler(map);
			 this.getDragLocation();

				//google.maps.event.addListener(myMarker, 'dragend', function(evt){
//     document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
// });
			 //console.log(this.map.getPosition());

      }

			getLocationSpecifc(userlocation){
				 this.tempToken = this.loginObj;
				 var CORSHeaders = new Headers();
				 let accessToken = this.tempToken._body;
				 let parseToken = JSON.parse(accessToken);
				 CORSHeaders.append('x-access-token', parseToken.token);
				 CORSHeaders.append('x-key', 'pramod');
				 this.http.get('https://evoint.herokuapp.com/api/v1/getChargingPointBy?longitude='+ userlocation.longitude + '&latitude=' + userlocation.latitude, {headers: CORSHeaders}).map((res) => res.json())
				.subscribe(data => {
					//let tempData = [];
					// for(let latLng of data){
					// 	// let AddressInfo = {}
					// 	// AddressInfo['Latitude'] = latLng.latitude;
					// 	// AddressInfo['Longitude'] = latLng.longitude;
					// 	// tempData.push(AddressInfo);
					// 	}
					 //this.addMarkersToMap(tempData);
				})
			}

//pop up window  & post API call.
			addInfoWindow(marker, content) {
	    let infoWindow = new google.maps.InfoWindow({content: content});

			google.maps.event.addListener(marker, 'click', () => {
	      infoWindow.open(this.map, marker);
				 var el: HTMLElement = document.getElementById('btnCl');
				 let pushData = [];
				var saveInputInfo =  el.addEventListener('click', function(){
					var inputVal = (<HTMLInputElement>document.getElementById('feildInput')).value;
					postLeavingTime(inputVal);
				 });

				 var postLeavingTime = (val)  => {
					 if(val.length > 0){
						 let  customObj = {}
						 customObj['leavingtime'] = val;
					 var CORSHeaders = new Headers();
						 CORSHeaders.append('Content-Type', 'application/json');
						 this.http.post('http://localhost:4001/addTime',  customObj).subscribe(data => {
								const res = data.json();
							});
				 }
			 }
		 });
  }



			getMarkers() {
				 this.tempToken = this.loginObj;
				var CORSHeaders = new Headers();
				let accessToken = this.tempToken._body;
				let parseToken = JSON.parse(accessToken);
				 CORSHeaders.append('x-access-token', parseToken.token);
					CORSHeaders.append('x-key', 'pramod');
				//https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=500&compact=true&verbose=false
				//https://api.openchargemap.io/v3/poi/?client=ocm.app.ionic.v6_0_0&verbose=false&compact=true&output=json&latitude=37.6903074954139&longitude=-121.8869628&includecomments=true&maxresults=
				//500&connectiontypeid=&operatorid=&usagetypeid=&statustypeid=&minpowerkw=0&compact=true&boundingbox=
				//(37.69495987897133,-121.86402454850463),(37.68565481996576,-121.90990105149535)
			  // this.http.get('https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=500&compact=true&verbose=false')
				// //this.http.get('https://evoint.herokuapp.com/api/v1/getAllChargingPoints')
				// .map((res) => res.json())
			  // .subscribe(data => {
				// 	//console.log('data' , data);
				// 	let tempData = [];
				// 	for(let latLng of data){
				// 		tempData.push(latLng.AddressInfo);
        //         //console.log('latLng', latLng.AddressInfo);
				//
				// 	}
				// 	 this.addMarkersToMap(tempData);
			  // });

			this.http.get('https://evoint.herokuapp.com/api/v1/getAllChargingPoints',
			{headers: CORSHeaders}).map((res) => res.json())
			.subscribe(data => {
				let tempData = [];
				for(let latLng of data){
					let AddressInfo = {}
					AddressInfo['Longitude'] = latLng.location[0];
					AddressInfo['Latitude'] = latLng.location[1];
					tempData.push(AddressInfo);
					}
				 this.addMarkersToMap(tempData);
			})
			}
			addMarkersToMap(markers) {
				for(let marker of markers) {
			   var position = new google.maps.LatLng(marker.Latitude, marker.Longitude);
			   var userMarker = new google.maps.Marker({
					 position: position,
					 title: marker.title,
					 icon: 'https://s3.amazonaws.com/plugshare.production.assets/icons/G@2x.png',
				 	 map: this.map, draggable: true
				});
				 let content = `<input type="text" id="feildInput">
				 								<button type="buttom" id="btnCl">submit</button>`;
        this.addInfoWindow(userMarker, content);

			 	}
			}
			addInfoWindowToMarker(marker) {}
		 AutocompleteDirectionsHandler(map) {
			 this.map = map;
			 this.originPlaceId = null;
			 this.destinationPlaceId = null;
			 this.travelMode = 'WALKING';
			 var originInput = document.getElementById('origin-input');
			 var destinationInput = document.getElementById('destination-input');
			 var modeSelector = document.getElementById('mode-selector');
			 this.directionsService = new google.maps.DirectionsService;
			 this.directionsDisplay = new google.maps.DirectionsRenderer;
			 this.directionsDisplay.setMap(map);

			 var originAutocomplete = new google.maps.places.Autocomplete(
					 originInput, {placeIdOnly: true});
			 var destinationAutocomplete = new google.maps.places.Autocomplete(
					 destinationInput, {placeIdOnly: true});

			 this.setupClickListener('changemode-walking', 'WALKING');
			 this.setupClickListener('changemode-transit', 'TRANSIT');
			 this.setupClickListener('changemode-driving', 'DRIVING');

			 this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
			 this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

			 this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
			 this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
			 this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

		 }

		 // Sets a listener on a radio button to change the filter type on Places
		 // Autocomplete.

		 setupClickListener(id, mode){
			 var radioButton = document.getElementById(id);
			 var me = this;
			 radioButton.addEventListener('click', function() {
				 me.travelMode = mode;
				 me.route();
			 });
		 };

		 setupPlaceChangedListener(autocomplete, mode) {
			 var me = this;
			 autocomplete.bindTo('bounds', this.map);
			 autocomplete.addListener('place_changed', function() {
				 var place = autocomplete.getPlace();
				 if (!place.place_id) {
					 window.alert("Please select an option from the dropdown list.");
					 return;
				 }
				 if (mode === 'ORIG') {
					 me.originPlaceId = place.place_id;
				 } else {
					 me.destinationPlaceId = place.place_id;
				 }
				 me.route();
			 });

		 };

		 route() {
			 if (!this.originPlaceId || !this.destinationPlaceId) {
				 return;
			 }else if((this.originPlaceId || this.destinationPlaceId) !== null){
				this.location = {
					 "origin": this.originPlaceId,
					 "dest" : this.destinationPlaceId
				 }
				  this.storage.set('whereToGo', this.location);
			 }
			 var me = this;

			 this.directionsService.route({
				 origin: {'placeId': this.originPlaceId},
				 destination: {'placeId': this.destinationPlaceId},
				 travelMode: this.travelMode
			 }, function(response, status) {
				 if (status === 'OK') {
					 me.directionsDisplay.setDirections(response);
				 } else {
					 window.alert('Directions request failed due to ' + status);
				 }
			 });
		 };

//get current location on scroll

getDragLocation(){
	let TempLocObj = {};
	var self = this;
		 new google.maps.event.addListener(this.map, 'dragend', function(event){
			 self.getCenterLocatfsdfion();
	});
}

getCenterLocatfsdfion(){
	let fsa =		this.map.getCenter();  //google maps
	let longitude = fsa.lng();
	let latitude = fsa.lat();
	let userDraggedLatLng = {};
	userDraggedLatLng['longitude'] = longitude;
	userDraggedLatLng['latitude'] = latitude;
	this.getLocationSpecifc(userDraggedLatLng);

}


}
