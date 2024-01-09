import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLoginPayload, ResetPasswordPayloadInterface, UserLoginActionProps } from 'src/app/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:HttpClient = inject(HttpClient)
 URL:string='http://localhost:3000';
  constructor() { }

  //user signup
   user_signup(userData:any){
    return this.http.post(`${this.URL}/api/user/register`,{userData})
  }

  //user otp verification
  user_otp_verification(otp:string){
    return this.http.post(`${this.URL}/api/user/otp`,{otp})
  }
  //user login
  loginUser(loginData:UserLoginActionProps){
    return this.http.post(`${this.URL}/api/user/login`,{loginData})
  }

  //user send email to reset password
  sendEmail(email:string){
    return this.http.post(`${this.URL}/api/user/send_email`,{email})
  }

  //user reset password 
  resetPassword(payload:ResetPasswordPayloadInterface ){
    return this.http.patch(`${this.URL}/api/user/reset_password`,{payload})
  }

  //Set user token
  setToken(token:string){
    localStorage.setItem('token',token)
  }
//Get user token
  getToken():string|null{
    return localStorage.getItem('token')
  }

  //Delete user token
  deleteToken():void{
localStorage.removeItem('token')
  }

  ///admin login 

  adminLogin(payload:AdminLoginPayload){
    return this.http.post(`${this.URL}/api/admin/login`,payload)
  }


  //admin jwt token set

  setAdminToken(token:string){
    localStorage.setItem('admin',token)
  }

  //delete the admin token
  deleteAdminToken(){
    localStorage.removeItem('admin')

  }

  //get the admin token

  getAdminToken():string|null{
    return localStorage.getItem('admin')
  }


}
