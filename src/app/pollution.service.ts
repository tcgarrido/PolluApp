import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  public geolon = 0
  public geolat = 0
  public accur = 0

  public setGeo(geolat, geolon, accur){
    this.geolat = geolat
    this.geolon = geolon
    this.accur = accur
  }

  constructor(public http: HttpClient) { }

  public getPollution(lat, lon){
    lat = lat.toFixed(1)
    lon = lon.toFixed(1)
    return this.http.get(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=J5ywh25cr8PXXHCHo`)
  }
}
