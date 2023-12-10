import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordPayloadInterface } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  router = inject(Router);
  activatedRoute=inject(ActivatedRoute)
  http = inject(HttpClient)
  authService = inject(AuthService)
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val)=>{
      this.token=val['token'];

    })
  }
  sendMail:boolean=false
  token?:string

     
  resetPasswordFormControl = new  FormGroup({
    password:new FormControl(null,[Validators.minLength(8),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')]),
    renteredpassword:new FormControl(null,[Validators.minLength(8),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')])
  })


  onSubmitForm(){
    if(this.resetPasswordFormControl.valid &&(this.resetPasswordFormControl.controls.password.value ===this.resetPasswordFormControl.controls.renteredpassword.value)){
      const payload:ResetPasswordPayloadInterface ={
        password:this.resetPasswordFormControl.controls.password.value,
        renteredpassword:this.resetPasswordFormControl.controls.renteredpassword.value,
        token :this.token as string
      }
this.authService.resetPassword(payload).subscribe((response:any)=>{
  console.log(response);
if(response.statuscode=== 200 ){
  this.router.navigate(['/login'])
}
})
      
    }
}


}
