webpackJsonp([1],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Landingpage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let Landingpage = class Landingpage {
    constructor(navCtrl, navParams, barcode, storage, geolocation, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcode = barcode;
        this.storage = storage;
        this.geolocation = geolocation;
        this.http = http;
        // var postLeavingTime = (val)  => {
        this.getUserLocation = (userLatLng) => {
            if (userLatLng) {
            }
            return userLatLng;
        };
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess);
        }
    }
    geoSuccess(position) {
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
            "password": "pramod123"
        };
        var CORSHeaders = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
        CORSHeaders.append('Content-Type', 'application/json');
        this.http.post('https://evoint.herokuapp.com/user/login', postData, { headers: CORSHeaders }).subscribe(data => {
            this.loginObj = data;
            this.getMarkers();
            if (navigator.geolocation) {
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
    ngOnInit() {
        this.login();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.location = position.coords;
                this.getUserLocation(this.location);
            });
        }
    }
    initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,
            draggable: true,
            center: {
                lat: 37.370196,
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
            var latLng = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
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
    getLocationSpecifc(userlocation) {
        this.tempToken = this.loginObj;
        var CORSHeaders = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
        let accessToken = this.tempToken._body;
        let parseToken = JSON.parse(accessToken);
        CORSHeaders.append('x-access-token', parseToken.token);
        CORSHeaders.append('x-key', 'pramod');
        this.http.get('https://evoint.herokuapp.com/api/v1/getChargingPointBy?longitude=' + userlocation.longitude + '&latitude=' + userlocation.latitude, { headers: CORSHeaders }).map((res) => res.json())
            .subscribe(data => {
            //let tempData = [];
            // for(let latLng of data){
            // 	// let AddressInfo = {}
            // 	// AddressInfo['Latitude'] = latLng.latitude;
            // 	// AddressInfo['Longitude'] = latLng.longitude;
            // 	// tempData.push(AddressInfo);
            // 	}
            //this.addMarkersToMap(tempData);
        });
    }
    //pop up window  & post API call.
    addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({ content: content });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
            var el = document.getElementById('btnCl');
            let pushData = [];
            var saveInputInfo = el.addEventListener('click', function () {
                var inputVal = document.getElementById('feildInput').value;
                postLeavingTime(inputVal);
            });
            var postLeavingTime = (val) => {
                if (val.length > 0) {
                    let customObj = {};
                    customObj['leavingtime'] = val;
                    var CORSHeaders = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
                    CORSHeaders.append('Content-Type', 'application/json');
                    this.http.post('http://localhost:4001/addTime', customObj).subscribe(data => {
                        const res = data.json();
                    });
                }
            };
        });
    }
    getMarkers() {
        this.tempToken = this.loginObj;
        var CORSHeaders = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
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
        this.http.get('https://evoint.herokuapp.com/api/v1/getAllChargingPoints', { headers: CORSHeaders }).map((res) => res.json())
            .subscribe(data => {
            let tempData = [];
            for (let latLng of data) {
                let AddressInfo = {};
                AddressInfo['Longitude'] = latLng.location[0];
                AddressInfo['Latitude'] = latLng.location[1];
                tempData.push(AddressInfo);
            }
            this.addMarkersToMap(tempData);
        });
    }
    addMarkersToMap(markers) {
        for (let marker of markers) {
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
    addInfoWindowToMarker(marker) { }
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
        var originAutocomplete = new google.maps.places.Autocomplete(originInput, { placeIdOnly: true });
        var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, { placeIdOnly: true });
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
    setupClickListener(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function () {
            me.travelMode = mode;
            me.route();
        });
    }
    ;
    setupPlaceChangedListener(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }
            if (mode === 'ORIG') {
                me.originPlaceId = place.place_id;
            }
            else {
                me.destinationPlaceId = place.place_id;
            }
            me.route();
        });
    }
    ;
    route() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
            return;
        }
        else if ((this.originPlaceId || this.destinationPlaceId) !== null) {
            this.location = {
                "origin": this.originPlaceId,
                "dest": this.destinationPlaceId
            };
            this.storage.set('whereToGo', this.location);
        }
        var me = this;
        this.directionsService.route({
            origin: { 'placeId': this.originPlaceId },
            destination: { 'placeId': this.destinationPlaceId },
            travelMode: this.travelMode
        }, function (response, status) {
            if (status === 'OK') {
                me.directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    ;
    //get current location on scroll
    getDragLocation() {
        let TempLocObj = {};
        var self = this;
        new google.maps.event.addListener(this.map, 'dragend', function (event) {
            self.getCenterLocatfsdfion();
        });
    }
    getCenterLocatfsdfion() {
        let fsa = this.map.getCenter(); //google maps
        let longitude = fsa.lng();
        let latitude = fsa.lat();
        let userDraggedLatLng = {};
        userDraggedLatLng['longitude'] = longitude;
        userDraggedLatLng['latitude'] = latitude;
        this.getLocationSpecifc(userDraggedLatLng);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], Landingpage.prototype, "mapElement", void 0);
Landingpage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'landingpage',template:/*ion-inline-start:"/Users/reddy/Documents/ev/src/pages/landingpage/landingpage.html"*/'<ion-header>\n    <ion-navbar primary>\n        <ion-buttons start>\n            <button menuToggle>\n                <ion-icon name="menu"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title style="text-align: center;"> Charge-Points </ion-title>\n        <ion-buttons end></ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n\n    <div id="mode-selector" class="controls" style="display:none">\n        <input type="radio" name="type" id="changemode-walking" checked="checked">\n        <label for="changemode-walking">Walking</label>\n        <input type="radio" name="type" id="changemode-transit">\n        <label for="changemode-transit">Transit</label>\n        <input type="radio" name="type" id="changemode-driving">\n        <label for="changemode-driving">Driving</label>\n    </div>\n    <!-- <div id="street-view" height="100%"></div> -->\n    <div #map id="map" style="width: 100%;height: 100%;">\n        <h1>Loading maps</h1>\n        <h1>Please wait</h1> </div>\n</ion-content>\n'/*ion-inline-end:"/Users/reddy/Documents/ev/src/pages/landingpage/landingpage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */]])
], Landingpage);

//# sourceMappingURL=landingpage.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/settings/settings.module": [
		274,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 153;

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Addcard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment_payment__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the Addpayment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let Addcard = class Addcard {
    constructor(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
    }
    onSubmit(form) {
        this.storage.set('canDrive', form);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__payment_payment__["a" /* Payment */]);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad Addpayment');
    }
};
Addcard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-addpayment',template:/*ion-inline-start:"/Users/reddy/Documents/ev/src/pages/addcard/addcard.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>  </ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content padding>\n\n	<ion-list >\n		<div class="">\n			<div class="row payment-container" style="margin: -5% -10% 0% -9%;">\n				<div class="col-xs-12 col-md-4">\n					<div class="panel panel-default">\n						<div class="panel-heading">\n							<h3 class="panel-title">Payment Details</h3>\n							<div class="checkbox pull-right">\n								<label>\n									<input type="checkbox" /> Remember </label>\n							</div>\n						</div>\n						<div class="panel-body">\n							<form #addCardFrom="ngForm" (ngSubmit)="onSubmit(addCardFrom.value)" class="form-horizontal">\n                <div class="form-group">\n									<label for="cardNumber">First Name</label>\n									<div class="input-group">\n										<input type="text" class="form-control" id="firstName" name="firstName" placeholder="Fist name" ngModel/>\n									</div>\n								</div>\n								<div class="form-group">\n									<label for="cardNumber">Last Name</label>\n									<div class="input-group">\n										<input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last name" required autofocus ngModel/>\n									</div>\n								</div>\n								<div class="form-group">\n									<label for="cardNumber"> Card Number</label>\n									<div class="input-group">\n										<input type="text" class="form-control" id="cardNumber" name="cardNumber" placeholder="Valid Card Number" required autofocus ngModel/> <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>\n									</div>\n								</div>\n								<div class="row">\n									<div class="col-xs-7 col-md-7">\n										<div class="form-group">\n											<label for="expityMonth">EXPIRY DATE</label>\n											<div class="col-xs-8">\n												<input type="text" class="form-control" id="expityMonth" name="expityMonth" placeholder="MM/YY" required ngModel/>\n											</div>\n											<!-- <div class="col-xs-6 col-lg-6 pl-ziro">\n												<input type="text" class="form-control" id="expityYear" name="expityYear" placeholder="YY" required ngModel/>\n											</div> -->\n										</div>\n									</div>\n									<div class="col-xs-5 col-md-5 pull-right">\n										<div class="form-group">\n											<label for="cvCode">CVV CODE</label>\n											<input type="password" class="form-control" id="cvCode" name="cvCode" placeholder="CVV" required ngModel/> </div>\n									</div>\n								</div>\n\n                  <button type="submit" class="btn btn-primary ">Add Card</button>\n							</form>\n						</div>\n					</div>\n					<br/>\n\n				</div>\n			</div>\n		</div>\n\n		<!--<ion-item>\n		<ion-label floating id="userNamePayment">Username</ion-label>\n		<ion-input type="text" value=""></ion-input>\n		</ion-item>\n\n		<ion-item>\n		<ion-label floating id="passwordPayment">Password</ion-label>\n		<ion-input type="password" value=""></ion-input>\n		</ion-item>-->\n	</ion-list>\n	<!-- <ion-list *ngIf="item.title === \'Paypal\'">\n		 <div id="paypal-button-container"></div>\n	</ion-list> -->\n\n</ion-content>\n'/*ion-inline-end:"/Users/reddy/Documents/ev/src/pages/addcard/addcard.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], Addcard);

//# sourceMappingURL=addcard.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_payment__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { ContactPage } from '../contact/contact';

/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let Settings = class Settings {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = [];
        this.items = [
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
        /*for(let i = 0; i < 5; i++ ){
        this.data.push({
            title: 'Title '+i,
            details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            icon: 'ios-add-circle-outline',
            showDetails: false
        });
    }*/
    }
    itemSelected(items) {
        if (items.title === "Payment") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__payment_payment__["a" /* Payment */]);
        }
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
};
Settings = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"/Users/reddy/Documents/ev/src/pages/settings/settings.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>Settings</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<!--profile image  -->\n\n	<ion-list>\n		<ion-grid>\n			<ion-row>\n				<ion-col>\n\n					<button ion-item *ngFor="let item of items" (click)="itemSelected(item)"> \n						<div class="itemDiscription" style="\n    position: absolute;\n    left: 39%;\n    top: 30%;\n" >\n							{{ item.title }}\n						</div>\n						  <!-- <ion-icon [name]="\'logo-\' + item.icon" item-start></ion-icon> -->\n							 <ion-icon [name]="item.icon" [ngStyle]="{\'color\': item.color}" style="position: absolute;\n    left: 21%;\n    top: 32%;"></ion-icon>\n\n					</button>\n\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n	</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/reddy/Documents/ev/src/pages/settings/settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], Settings);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_payment_payment__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_addcard_addcard__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_landingpage_landingpage__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_barcode_barcode__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















// import { PaymentPage } from '../pages/payment/payment';
// import { AgmCoreModule } from 'angular2-google-maps/core/index.js';
// import { Addpayment } from '../pages/addpayment/addpayment';
//import { provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_landingpage_landingpage__["a" /* Landingpage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_barcode_barcode__["a" /* Barcode */],
            __WEBPACK_IMPORTED_MODULE_11__pages_payment_payment__["a" /* Payment */],
            __WEBPACK_IMPORTED_MODULE_13__pages_addcard_addcard__["a" /* Addcard */],
            __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* Settings */]
            // ContactPage,
            // PaymentPage,
            // Addpayment
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/settings/settings.module#SettingsModule', name: 'Settings', segment: 'settings', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_landingpage_landingpage__["a" /* Landingpage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_barcode_barcode__["a" /* Barcode */],
            __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_11__pages_payment_payment__["a" /* Payment */],
            __WEBPACK_IMPORTED_MODULE_13__pages_addcard_addcard__["a" /* Addcard */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_landingpage_landingpage__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_landingpage_landingpage__["a" /* Landingpage */];
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
};
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/reddy/Documents/ev/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/reddy/Documents/ev/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__landingpage_landingpage__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { PaymentPage } from '../payment/payment';
// import { ContactPage } from '../contact/contact';




//http://localhost:8100/api/users/login
let HomePage = class HomePage {
    constructor(navCtrl, loadingCtrl, http, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.show_logo = false;
        this.loginOrRegister = "login";
        this.show = true;
    }
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
    goToLandingPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__landingpage_landingpage__["a" /* Landingpage */]);
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
    onSubmit(form, storage) {
        console.log('you submitted value:', form);
        var CORSHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        CORSHeaders.append('Content-Type', 'application/json');
        //http://ec2-52-14-217-199.us-east-2.compute.amazonaws.com:9000/api/users/login
        this.http.post('http://localhost:9000/api/users/login', form, { headers: CORSHeaders }).subscribe(data => {
            const res = data.json();
            const drive = res.user.elgibility.driveEligibility;
            console.log(drive);
            this.storage.set('canDrive', drive);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__landingpage_landingpage__["a" /* Landingpage */]);
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
};
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/reddy/Documents/ev/src/pages/home/home.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title style="text-aling:center"> Charge point welcomes </ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content padding>\n	<div ng-controller="MyCtrl">\n    <img id="landingImage" src="http://jsfiddle.net/img/logo.png"/>\n</div>\n\n	<img  src="../assets/icon/download.png"/>\n\n\n	<button (click)="goToLandingPage()" id="rollBtn" class="button"><span>Take me to maps </span></button>\n	<div class="bb">\n		<h3 style="300 20px/22px Signika, Helvetica, Arial, sans-serif">welcome to EV app, where you can find all the charging points and one place to know if change point is empty or if you wanted to chat with another person.</h3>\n	</div>\n\n	<!-- <button (click)="clicked()">Click</button>\n	The world is your oyster.\n	<p>\n	If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.\n	</p> -->\n	<!--  <div class="container login-container">\n			<div class="title">\n				Welcome to angular2 app\n			</div>\n			<div class="panel-body">\n				<div class="row">\n					<div class="input-field col s12">\n					<input  id="email"\n							type="email"  class="validate">\n						<label for="email">Email</label>\n					</div>\n				</div>\n\n				<div class="row">\n\n					<div class="input-field col s12">\n						<input  id="password"\n							type="password" class="validate">\n						<label for="password">Password</label>\n					</div>\n				</div><br>\n\n				<span>{{errorMsg}}</span>\n				<button (click)="login()"\n					class="btn waves-effect waves-light"\n					type="submit" name="action">Login</button><br>\n\n			</div>\n		</div> -->\n	<!-- <div class="container">\n		<h2 class="text-center">Login</h2>\n		<div class="container text-center"> -->\n			<!-- <img src="" class="img-circle text-center" alt="Cinque Terre" width="80" height="80">  -->\n		<!-- </div>\n		 <form #loginForm = "ngForm" (ngSubmit)="onSubmit(loginForm.value)" class="form-horizontal" id="loginForm">\n		  <form  class="form-horizontal">\n			<div class="form-group">\n				<label class="control-label col-sm-2" for="email">Email:</label>\n				<div class="col-sm-10">\n					<input type="email" class="form-control" id="username" name="username" n placeholder="Enter email" ngModel> </div>\n			</div>\n			<div class="form-group">\n				<label class="control-label col-sm-2" for="pwd">Password:</label>\n				<div class="col-sm-10">\n					<input type="password" class="form-control" id="pwd" name="password" placeholder="Enter password" ngModel> </div>\n			</div>\n			<div class="form-group">\n				<div class="col-sm-offset-2 col-sm-10">\n					<div class="checkbox">\n						<label>\n							<input type="checkbox"> Remember me</label>\n					</div>\n				</div>\n			</div>\n			<div class="form-group">\n				<div class="col-sm-offset-2 col-sm-10 text-center">\n			<button (click)="nextPage();"  type ="submit" class="btn btn-primary ">Login</button>\n				</div>\n			</div>\n			<br>\n			<br>\n			<br>\n			<div class="container">\n				<div class="row">\n					<div class="facebook col-xs-6"> </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n					<div class="twitter col-xs-6"> </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n					<div class="google col-xs-6"> </div>\n				</div>\n			</div>\n		</form>\n		<button style="position: absolute;top: 82%;left: 67%;" class="btn btn-info col-md-3 col-md-offset-3">Register</button>\n	</div> -->\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/reddy/Documents/ev/src/pages/home/home.html"*/,
        styles: [`input.ng-invalid{border:2px solid red}input.ng-valid{border:rgb(204, 204, 204);}input.ng-pristine{border:rgb(204, 204, 204);}`],
        styleUrls: ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css']
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Barcode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the Barcode page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let Barcode = class Barcode {
    constructor(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
    }
    ionViewDidLoad() {
        this.getLocation();
    }
    getLocation() {
        this.storage.get('whereToGo').then((val) => {
            if (val) {
                this.imgsrc = "https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=h%7c1&chl=" + "wheretogo" + val.origin + "andDest " + val.dest;
                //this.imgsrc="https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=h%7c1&chl=wheretogoChIJ86V7GXT0j4ARbMMDIJdJbuAandDestEiRCYXJ0IFdheSwgRnJlbW9udCwgQ0EsIFVuaXRlZCBTdGF0ZXM"
            }
            else {
                this.imgsrc = "https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=h%7c1&chl=";
            }
        });
    }
};
Barcode = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-barcode',template:/*ion-inline-start:"/Users/reddy/Documents/ev/src/pages/barcode/barcode.html"*/'<!--\n  Generated template for the Barcode page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>barcode</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<img [src]="imgsrc" id="barcode" alt="">\n</ion-content>\n'/*ion-inline-end:"/Users/reddy/Documents/ev/src/pages/barcode/barcode.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], Barcode);

//# sourceMappingURL=barcode.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Payment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addcard_addcard__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






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
let Payment = class Payment {
    constructor(nav, storage) {
        this.nav = nav;
        this.storage = storage;
        this.items = [];
        this.storage.get('canDrive').then((val) => {
            if (val === null) {
                return;
            }
            else {
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
        ];
        console.log('final', this.items);
    }
    goToSlide() {
        this.slides.slideTo(2, 500);
    }
    openNavDetailsPage(item) {
        if (item.title === 'Add Payment Method') {
            item.title = 'Add Payment';
            return;
        }
        if (item.title === 'Add Payment') {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_2__addcard_addcard__["a" /* Addcard */], { item: item });
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
], Payment.prototype, "slides", void 0);
Payment = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
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
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], Payment);

//# sourceMappingURL=payment.js.map

/***/ })

},[201]);
//# sourceMappingURL=main.js.map