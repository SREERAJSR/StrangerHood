import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { adminLogin, userlogin } from 'src/app/app-state/auth/auth.actions';
import { AuthStateInterface } from 'src/app/models/state.models';
import { UserLoginActionProps } from 'src/app/models/user.models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  store = inject(Store<{auth:AuthStateInterface}>)
  loginFormControl = new  FormGroup ({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.minLength(8),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')])
    
  })
  
  onSubmitLoginForm(){
    const loginAdminData:UserLoginActionProps={email:this.loginFormControl.controls.email.value,password:this.loginFormControl.controls.password.value}
  
  
    if(this.loginFormControl.valid){
      this.store.dispatch(adminLogin({payload:loginAdminData}))
    }
  }
}
