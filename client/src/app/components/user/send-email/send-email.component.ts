import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
constructor(private authService:AuthService){}
sendMail:boolean=false
sendEmailformControl = new  FormGroup({
  email:new FormControl(null,[Validators.email,Validators.required]),
  
})
onSubmitForm(){
  const email:string|null = this.sendEmailformControl.controls.email.value
if(this.sendEmailformControl.valid && email){

  this.authService.sendEmail(email).subscribe((response)=>{
    console.log(response);
    this.sendMail = true;
  })
}

}

}
