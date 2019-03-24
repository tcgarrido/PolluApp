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
  public buttonStatus = false;

  constructor(
    private pollutionService: PollutionService,
    private geolocation: Geolocation,

    private ClockService: ClockService,

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
        this.color = '#fd6a02'
        this.status = 'Unhealthy I'
      } else if (254 < this.val.data.current.pollution.aqius && this.val.data.current.pollution.aqius <= 354) {
        this.color = '#ea001f'
        this.status = 'Unhealthy II'
      } else if (354 < this.val.data.current.pollution.aqius && this.val.data.current.pollution.aqius <= 424) {
        this.color = '#ba015a'
        this.status = 'Very unhealthy'
      } else if (this.val.data.current.pollution.aqius > 424) {
        this.color = '#6900ba'
        this.status = 'Hazardous'
      }

    })
  }

  initRefresh() {
    this.triggerSum(this.state);
    this.timeoutId = setInterval(() => this.triggerSum(this.state), 1000);
  }

  startClock(){  
    this.ClockService.start()
    this.state = 'med'
    this.initRefresh();
    this.buttonStatus = true;

  }

  restartClock(){
    this.ClockService.restart()
    this.state = 'med'
    this.ClockService.changeState('med', this.val.data.current.pollution.aqius)
    this.totPollution = 0;
  }

  triggerSum(state){
    this.state = state
    this.ClockService.changeState(state, this.val.data.current.pollution.aqius)
    this.totPollution = this.ClockService.totalPollution;
  }
}
