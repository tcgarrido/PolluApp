import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { PollutionService } from '../pollution.service'

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;

  public val

  watchLocationUpdates:any;
  loading:any;
  isWatching:boolean;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private pollutionService: PollutionService
  ) {
}

  ngOnInit() {}

//Get current coordinates of device
  ionViewWillEnter() {
    this.geoLatitude = this.pollutionService.geolat;
    this.geoLongitude = this.pollutionService.geolon;
    this.geoAccuracy = this.pollutionService.accur;
    console.log(this.pollutionService)
    this.pollutionService.getPollution(this.geoLatitude, this.geoLongitude).subscribe(val => {
      this.val = val === null ? {} : val['data'].current.pollution.aqius
    })
  }
}
