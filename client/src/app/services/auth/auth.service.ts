import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPasswordPayloadInterface, UserLoginActionProps } from 'src/app/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:HttpClient = inject(HttpClient)
 URL:string='http://localhost:3000';
  constructor() { }

   user_signup(userData:any){
    return this.http.post(`${this.URL}/api/user/register`,{userData})
  }

  user_otp_verification(otp:string){
    return this.http.post(`${this.URL}/api/user/otp`,{otp})
  }
  loginUser(loginData:UserLoginActionProps){
    return this.http.post(`${this.URL}/api/user/login`,{loginData})
  }

  sendEmail(email:string){
    return this.http.post(`${this.URL}/api/user/send_email`,{email})
  }

  resetPassword(payload:ResetPasswordPayloadInterface ){
    return this.http.patch(`${this.URL}/api/user/reset_password`,{payload})
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }

  getToken():string|null{
    return localStorage.getItem('token')
  }
  deleteToken():void{
localStorage.removeItem('token')
  }
}
