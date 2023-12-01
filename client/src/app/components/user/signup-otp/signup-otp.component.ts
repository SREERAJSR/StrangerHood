import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css']
})
export class SignupOtpComponent {


otpForm = new FormGroup({
  first : new FormControl(null,[Validators.required]),
  second: new FormControl(null,[Validators.required]),
  third: new FormControl(null,[Validators.required]),
  fourth: new FormControl(null,[Validators.required])
})
}
