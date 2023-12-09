import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { otpVerification } from 'src/app/app-state/auth/auth.actions';
import { AuthStateInterface } from 'src/app/models/state.models';

@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css']
})
export class SignupOtpComponent {
  constructor(private store:Store<{auth:AuthStateInterface}>){}


otpForm = new FormGroup({
  first : new FormControl(null,[Validators.required]),
  second: new FormControl(null,[Validators.required]),
  third: new FormControl(null,[Validators.required]),
  fourth: new FormControl(null,[Validators.required]),
  fifth: new FormControl(null,[Validators.required]),
  sixth: new FormControl(null,[Validators.required]),
})

onOtpSubmit(){
  const otp:string =`${this.otpForm.controls.first.value}${this.otpForm.controls.second.value}${this.otpForm.controls.third.value}${this.otpForm.controls.fourth.value}${this.otpForm.controls.fifth.value}${this.otpForm.controls.sixth.value}`
  console.log(otp);

  if(this.otpForm.valid){
    this.store.dispatch(otpVerification({otp:otp}))
  }
}
}
