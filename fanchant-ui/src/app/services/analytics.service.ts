import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeviceDetectorService} from "ngx-device-detector";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  ID_COOKIE_KEY: string = 'fanchantdeviceid';
  deviceData = {};
  cookieId: string;

  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private cookieService: CookieService,
  ) {
    this.deviceData = deviceService.getDeviceInfo();
    this.cookieId = this.cookieService.get(this.ID_COOKIE_KEY);
    if (!this.cookieId || this.cookieId == '') {
      this.cookieId = this.genId();
      this.cookieService.set(this.ID_COOKIE_KEY, this.cookieId);
    }
  }

  genId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 23) + Math.random().toString(36).substr(2, 23);
  };

  sendEvent(fromPage: string, event: string, loadTime: number, exitTime: number): void {
    const body = {
      device_id: this.cookieId,
      url: fromPage,
      event: event,
      extra: JSON.stringify(this.deviceData),
      load_time: loadTime,
      exit_time: exitTime,
      time_spent: exitTime - loadTime
    };

    this.http.post('/analytics', body).subscribe((r) => {
      console.log("Response!!!!!");
    });
  }
}
