import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../app/components/user/signup/signup.component';
import { SignupOtpComponent } from '../app/components/user/signup-otp/signup-otp.component';
import { LoginComponent } from '../app/components/user/login/login.component';
import { SendEmailComponent } from '../app/components/user/send-email/send-email.component';
import { ResetPasswordComponent } from '../app/components/user/reset-password/reset-password.component';
import { ErrorComponent } from '../app/components/error/error.component';
import { HomeComponent } from '../app/components/user/home/home.component';
import { adminAuthGuard, adminLoginAuthGuard, userAuthGuard, userLoginAuthGuard } from './route-guards/auth.guard';
import { AdminComponent } from '../app/components/admin/admin/admin.component';
import { AdminHomepageComponent } from '../app/components/admin/admin-homepage/admin-homepage.component';
import { ConnectPageComponent } from '../app/components/user/connect-page/connect-page.component';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[userAuthGuard]},
  {path:"signup", component:SignupComponent},
  {path:"otp",component:SignupOtpComponent},
  {path:"login",component:LoginComponent,canActivate:[userLoginAuthGuard]},
  {path:"send_email",component:SendEmailComponent},
  { path: "reset_password/:token", component: ResetPasswordComponent },
  {path:"connect",component:ConnectPageComponent},
{path:"admin_login",component:AdminComponent,canActivate:[adminLoginAuthGuard]},
{path:"admin",component:AdminHomepageComponent,canActivate:[adminAuthGuard]},
{path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
