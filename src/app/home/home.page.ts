import { Component } from '@angular/core';
import { PollutionService } from '../pollution.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ClockService } from '../clock.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  totPollution: number;

  public val

  constructor(
    private pollutionService: PollutionService,
    private geolocation: Geolocation,
    private ClockService: ClockService
  ) {}

  color = '#ffffff'
  status = ''

  ionViewWillEnter() {
    this.geoLatitude = this.pollutionService.geolat;
    this.geoLongitude = this.pollutionService.geolon;
    this.geoAccuracy = this.pollutionService.accur;
    this.totPollution = this.ClockService.totalPollution;
    console.log(this.pollutionService)
    this.pollutionService.getPollution(this.geoLatitude, this.geoLongitude).subscribe(val => {
      this.val = val
      if (this.val.data.current.pollution.aqius <= 54) {
        this.color = '#10dc60'
        this.status = 'Good'
      } else if (54 < this.val.data.current.pollution.aqius && this.val.data.current.pollution.aqius <= 154) {
        this.color = '#ffce00'
        this.status = 'Moderate'
      } else if (154 < this.val.data.current.pollution.aqius && this.val.data.current.pollution.aqius <= 254) {
        this.color = '#000000'
        this.status = 'Unhealthy I'
      } else if (254 < this.val.data.current.pollution.aqius && this.val.data.current.pollution.aqius <= 354) {
        this.color = '#000000'
        this.status = 'Unhealthy II'
      } else if (354 < this.val.data.current.pollution.aqius && this.val.data.current.pollution.aqius <= 424) {
        this.color = '#000000'
        this.status = 'Very unhealthy'
      } else if (this.val.data.current.pollution.aqius > 424) {
        this.color = '#000000'
        this.status = 'Hazardous'
      }

    })
  }

  startClock(){
    this.ClockService.start()
  }

  triggerSum(state){
    this.ClockService.changeState(state, this.val.data.current.pollution.aqius)
    this.totPollution = this.ClockService.totalPollution;
  }
}
