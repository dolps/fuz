import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage, // used for local storage
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {
}
