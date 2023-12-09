import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private authservice:AuthService) {
}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authtoken = this.authservice.getToken()
    console.log(authtoken);
    if(authtoken){
      const authReq = request.clone({
        setHeaders:{
          Authorization:`Bearer ${authtoken}`
        }
      })
      return next.handle(authReq)
    }
    return next.handle(request);
  }
}
