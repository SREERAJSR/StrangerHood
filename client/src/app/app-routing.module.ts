import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/user/signup/signup.component';
import { SignupOtpComponent } from './components/user/signup-otp/signup-otp.component';
import { LoginComponent } from './components/user/login/login.component';
import { SendEmailComponent } from './components/user/send-email/send-email.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/user/home/home.component';
import { userAuthGuard } from './route-guards/user-auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[userAuthGuard]},
  {path:"signup", component:SignupComponent},
  {path:"otp",component:SignupOtpComponent},
  {path:"login",component:LoginComponent},
  {path:"send_email",component:SendEmailComponent},
  {path:"reset_password/:token",component:ResetPasswordComponent},
  {path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
