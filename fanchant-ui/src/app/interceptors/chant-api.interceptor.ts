import {Injectable} from '@angular/core';
import {HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

export const IS_ASSETS_TOKEN = new HttpContextToken<boolean>(() => false);

@Injectable()
export class ChantApiInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let url = environment.chant_api_url + request.url;
    let headers = {
      'Content-Type': 'application/json',
    };

    // If requesting from local assets folder, do not modify API url
    if(request.context.get(IS_ASSETS_TOKEN)) {
      url = request.url;
    }

    const modified = request.clone({
      setHeaders: headers,
      url: url,
    });
    return next.handle(modified);
  }
}
