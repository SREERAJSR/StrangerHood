import { Component } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


loginFormControl = new  FormGroup ({
  email:new FormControl(null,[Validators.email,Validators.required]),
  password:new FormControl(null,[Validators.minLength(8),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')])
  
})


onSubmitLoginForm(){
  console.log(this.loginFormControl.get('password'));
}
}
