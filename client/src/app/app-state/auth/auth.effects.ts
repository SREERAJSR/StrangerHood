import { Injectable, effect } from "@angular/core";
import { Actions, EffectSources, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
import { login, loginSuccess, navigateToOtp, otpVerification, otpVerificationFailure, otpVerificationSuccess, signup, signupFailure, signupSucess } from "./auth.actions";
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

}