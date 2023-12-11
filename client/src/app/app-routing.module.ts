import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/user/signup/signup.component';
import { SignupOtpComponent } from './components/user/signup-otp/signup-otp.component';
import { LoginComponent } from './components/user/login/login.component';
import { SendEmailComponent } from './components/user/send-email/send-email.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/user/home/home.component';
import { adminAuthGuard, adminLoginAuthGuard, userAuthGuard, userLoginAuthGuard } from './route-guards/auth.guard';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminHomepageComponent } from './components/admin/admin-homepage/admin-homepage.component';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[userAuthGuard]},
  {path:"signup", component:SignupComponent},
  {path:"otp",component:SignupOtpComponent},
  {path:"login",component:LoginComponent,canActivate:[userLoginAuthGuard]},
  {path:"send_email",component:SendEmailComponent},
  {path:"reset_password/:token",component:ResetPasswordComponent},


{path:"admin_login",component:AdminComponent,canActivate:[adminLoginAuthGuard]},
{path:"admin",component:AdminHomepageComponent,canActivate:[adminAuthGuard]},
{path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
