import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/user/login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/user/signup/signup.component';
import { SignupOtpComponent } from './components/user/signup-otp/signup-otp.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './app-state/auth/auth.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './app-state/auth/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SendEmailComponent } from './components/user/send-email/send-email.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupOtpComponent,
    SendEmailComponent,
    ResetPasswordComponent,


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
