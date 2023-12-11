import { Injectable, effect, inject } from "@angular/core";
import { Actions, EffectSources, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
import {  adminLogin, adminLoginFailure, adminLoginSucess, adminLogout, adminLogoutsucess, loginFailure, loginSuccess, navigateAdminHomePage, navigateToHome, navigateToOtp, otpVerification, otpVerificationFailure, otpVerificationSuccess, signup, signupFailure, signupSucess, userLogout, userlogin } from "./auth.actions";
import { Router } from "@angular/router";
import { SignupOtpComponent } from "src/app/components/user/signup-otp/signup-otp.component";




@Injectable() 
export  class AuthEffects{

    constructor(private actions$:Actions ,
        private authService:AuthService,private router:Router){}


signupUser$ = createEffect(()=>{    
    return this.actions$.pipe(
        ofType(signup),
        switchMap((action)=>
        this.authService.user_signup(action.payload).pipe(
            map((response:any):any=>{
                console.log(response);
                if(response.otpStatus==='pending'){
                    this.authService.setToken(response.token)
                  return signupSucess()
                }
               return signupFailure({error:response})
               }
                ),
            catchError((error)=>{
                return of(signupFailure({error:error.error.message}))
            })
        )
        )
    )
})

signupSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(signupSucess),
    switchMap(() => {
      this.router.navigate(['/otp']);
      return of(navigateToOtp()); // Dispatch navigateToOtp action
    })
  )
)

otpVerification$= createEffect(()=>
this.actions$.pipe(
    ofType(otpVerification),
    switchMap((action)=>{
           return this.authService.user_otp_verification(action.otp).pipe(
            map((response: any) => {
                console.log(response.userData);
                return otpVerificationSuccess({payload:response.userData});
            })
        );
    }),catchError((error)=>{
        return of(otpVerificationFailure({error:error.error.message}))
    })
)) 


signupSucess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(otpVerificationSuccess),
    switchMap(() => {
      this.router.navigate(['/']);
      return of(navigateToOtp()); // Dispatch navigateToOtp action
    })
  )
)


loginUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userlogin),
    switchMap((action) =>
      this.authService.loginUser(action.payload).pipe(
        map((response: any): any => {
            console.log(response);
          if (response.status === true) {
            this.authService.setToken(response.token)
            return loginSuccess({ payload: response.userClientInfo });
          }
          return loginFailure({ error: response.error.message });
        }),
        catchError((error) =>{        
        return of(loginFailure({ error: error.error.message }))
    })
      )
    )
  )
);
loginSuces$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginSuccess),
    switchMap(() => {
      this.router.navigate(['/']);
      return of(navigateToOtp()); // Dispatch navigateToOtp action
    })
  )
)

userLogout$ = createEffect(()=>
this.actions$.pipe(
  ofType(userLogout),
  switchMap(()=>{
  this.authService.deleteToken();
  this.router.navigate(['/login'])
  return of(navigateToHome())
  })
)
)


//admin login effects

adminLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(adminLogin),
    switchMap((action) =>
      this.authService.adminLogin(action.payload).pipe(
        map((response: any): any => {
            console.log(response);
          if (response.status === 'accepted') {
            this.authService.setAdminToken(response.token)
            return adminLoginSucess({ payload: response.message });
          }
          return adminLoginFailure({ error: response.error.message });
        }),
        catchError((error) =>{        
          console.log(error);
        return of(adminLoginFailure({ error: error.error.message }))
    })
      )
    )
  )
);

adminloginSucess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(adminLoginSucess),
    switchMap(() => {
      this.router.navigate(['/admin']);
      return of(navigateAdminHomePage()); // Dispatch adminlogin action
    })
  )
)

adminlogoutSucess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(adminLogout),
    switchMap(() => {
      console.log('admin admin');
      this.authService.deleteAdminToken()
      if(!this.authService.getAdminToken())this.router.navigate(['/admin_login']);
      return of(adminLogoutsucess()); 
    })
  )
)

}


