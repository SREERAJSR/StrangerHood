import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../app/components/user/login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../app/components/user/signup/signup.component';
import { SignupOtpComponent } from '../app/components/user/signup-otp/signup-otp.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../app/app-state/auth/auth.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../app/app-state/auth/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from '../app/interceptors/auth.interceptor';
import { SendEmailComponent } from '../app/components/user/send-email/send-email.component';
import { ResetPasswordComponent } from '../app/components/user/reset-password/reset-password.component';
import { ErrorComponent } from '../app/components/error/error.component';
import { HomeComponent } from '../app/components/user/home/home.component';
import { AdminComponent } from '../app/components/admin/admin/admin.component';
import { AdminHomepageComponent } from '../app/components/admin/admin-homepage/admin-homepage.component';
import { NavbarComponent } from '../app/components/user/navbar/navbar.component';
import { ConnectPageComponent } from '../app/components/user/connect-page/connect-page.component';
import { ConnectFeatureComponent } from './components/user/connect-page/connect-feature/connect-feature.component';
import { FriendsComponent } from './components/user/connect-page/friends/friends.component';
import { RequestsComponent } from './components/user/connect-page/requests/requests.component';
import { CallsHistoryComponent } from './components/user/connect-page/calls-history/calls-history.component';



@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupOtpComponent,
    SendEmailComponent,
    ResetPasswordComponent,
    ErrorComponent,
    HomeComponent,
    AdminComponent,
    AdminHomepageComponent,
    NavbarComponent,
    ConnectPageComponent,
    ConnectFeatureComponent,
    FriendsComponent,
    RequestsComponent,
    CallsHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({auth:authReducer}),
    EffectsModule.forRoot(AuthEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })

  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
