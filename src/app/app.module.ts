import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Payment } from '../pages/payment/payment';
import { Settings } from '../pages/settings/settings';
import { Addcard} from '../pages/addcard/addcard';
import { Landingpage } from '../pages/landingpage/landingpage';
import { Barcode } from '../pages/barcode/barcode';
// import { PaymentPage } from '../pages/payment/payment';
// import { AgmCoreModule } from 'angular2-google-maps/core/index.js';
// import { Addpayment } from '../pages/addpayment/addpayment';
//import { provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core

@NgModule({
	declarations: [
		MyApp,
	  HomePage,
    Landingpage,
    Barcode,
    Payment,
    Addcard,
	  Settings
	// ContactPage,
	// PaymentPage,
	// Addpayment
	],
	imports: [
	BrowserModule,
	HttpModule,
	IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
	MyApp,
	 HomePage,
	 Landingpage,
   Barcode,
   Settings,
   Payment,
   Addcard,
	// AboutPage,
	// ContactPage,
	// PaymentPage,
	// Addpayment
],
	providers: [
		StatusBar,
	SplashScreen,
	Geolocation,
	 BarcodeScanner,
	{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {}
