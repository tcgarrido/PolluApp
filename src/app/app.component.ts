import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PollutionService } from './pollution.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Information',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pollutionService: PollutionService,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.geolocation.getCurrentPosition().then(resp => {
      this.pollutionService.setGeo(resp.coords.latitude, resp.coords.longitude, resp.coords.accuracy)
    })
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
