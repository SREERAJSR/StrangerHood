import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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

  setToken(token:string){
    localStorage.setItem('token',token)
  }

  getToken():string|null{
    return localStorage.getItem('token')
  }

}
