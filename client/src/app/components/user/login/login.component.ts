import { Component } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { userlogin } from 'src/app/app-state/auth/auth.actions';
import { AuthStateInterface } from 'src/app/models/state.models';
import { UserLoginActionProps } from 'src/app/models/user.models';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private store:Store<{auth:AuthStateInterface}>){}

loginFormControl = new  FormGroup ({
  email:new FormControl(null,[Validators.email,Validators.required]),
  password:new FormControl(null,[Validators.minLength(8),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')])
  
})

onSubmitLoginForm(){
  const loginUserData:UserLoginActionProps ={email:this.loginFormControl.controls.email.value,password:this.loginFormControl.controls.password.value}


  if(this.loginFormControl.valid){

this.store.dispatch(userlogin({payload:loginUserData}))
  }
}
}
