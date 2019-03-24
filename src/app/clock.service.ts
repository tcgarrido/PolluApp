import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  public state = null
  public initialDate = null
  public totalPollution = 0

  currentDate
  difference = 0
  minutes = 0
  x = 0
  mul = 0
  value = 0

  start() {
    this.state = 'med'
    this.initialDate = new Date()
  }

  changeState(state, pollution) {
    this.currentDate = new Date()
    this.difference = this.currentDate - this.initialDate
    this.initialDate = this.currentDate
    this.minutes = this.difference / (1000)

    if (this.state == 'med') {
      this.mul = 0.01666
    } else if (this.state == 'low'){
      this.mul = 0.006
    } else if (this.state == 'high'){
      this.mul = 0.075
    }

    this.x = this.AQIPM10(pollution)
    console.log(this.x)
    this.value = this.minutes*this.mul*this.x
    this.totalPollution += this.value
  }

  Linear(AQIhigh, AQIlow, Conchigh, Conclow, Concentration) {
    let linear;
    let Conc=parseFloat(Concentration);
    let a;
    a=((Conc-Conclow)/(Conchigh-Conclow))*(AQIhigh-AQIlow)+AQIlow;
    linear=Math.round(a);
    return linear;
  }

  AQIPM10(Concentration) {
    let Conc=parseFloat(Concentration);
    let c;
    let AQI;
    c=Math.floor(Conc);
    if (c>=0 && c<55) {
      AQI=this.Linear(50,0,54,0,c);
    }
    else if (c>=55 && c<155) {
      AQI=this.Linear(100,51,154,55,c);
    } else if (c>=155 && c<255) {
      AQI=this.Linear(150,101,254,155,c);
    } else if (c>=255 && c<355) {
      AQI=this.Linear(200,151,354,255,c);
    } else if (c>=355 && c<425) {
      AQI=this.Linear(300,201,424,355,c);
    } else if (c>=425 && c<505) {
      AQI=this.Linear(400,301,504,425,c);
    } else if (c>=505 && c<605) {
      AQI=this.Linear(500,401,604,505,c);
    } else {
      AQI="PM10message";
    }
    return AQI;
  }
}
