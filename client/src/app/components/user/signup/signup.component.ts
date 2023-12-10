import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {  signup } from 'src/app/app-state/auth/auth.actions';
import { AuthStateInterface } from 'src/app/models/state.models';
import { UserSignUpActionProps } from 'src/app/models/user.models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private store:Store<{auth:AuthStateInterface}>){}
  hide = true;
  hide1=true
  submitedData?:UserSignUpActionProps
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
console.log('password are not same');
  }
  this.submitedData={
    firstname: this.signupFormControl.value.firstname,
    lastname: this.signupFormControl.value.lastname,
    email: this.signupFormControl.value.email,
    mobile: this.signupFormControl.value.mobile,
    gender: this.signupFormControl.value.gender,
    password: this.signupFormControl.value.password,
    renteredpassword: this.signupFormControl.value.renteredpassword,
  }
this.store.dispatch(signup({payload:this.submitedData}))
  }
}
