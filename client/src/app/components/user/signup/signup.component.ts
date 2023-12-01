import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  hide = true;
  hide1=true
  passError?:boolean
  signupFormControl:FormGroup = new FormGroup({
    firstname:new FormControl(null,[Validators.required]),
    lastname:new FormControl(null,Validators.required),
    email : new FormControl(null,[Validators.required,Validators.email]),
    mobile:new FormControl(null,[Validators.required,Validators.minLength(10)]),
    gender:new FormControl('Male',[Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).{8,}$')]),
    renteredpassword : new FormControl(null,[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).{8,}$')])
  })


  onSignUpFormSubmit(){
  if(this.signupFormControl.get('password')?.value!==this.signupFormControl.get('renteredpassword')?.value ){
    this.passError=true

    console.log(this.signupFormControl);
  }


  }
}
