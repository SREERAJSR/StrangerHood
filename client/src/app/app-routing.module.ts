import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/user/signup/signup.component';
import { SignupOtpComponent } from './components/user/signup-otp/signup-otp.component';
import { LoginComponent } from './components/user/login/login.component';

const routes: Routes = [
  {path:"signup", component:SignupComponent},
  {path:"otp",component:SignupOtpComponent},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
