import { Injectable, effect } from "@angular/core";
import { Actions, EffectSources, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
import { login, loginSuccess, otpVerification, signup, signupFailure, signupSucess } from "./auth.actions";


@Injectable()
export  class AuthEffects{

    constructor(private actions$:Actions ,private authService:AuthService){}


signupUser$ = createEffect(()=>{    
    return this.actions$.pipe(
        ofType(login),
        switchMap((action)=>
        this.authService.user_signup(action.payload).pipe(
            map((response:any):any=>{
                if(response.otpstatus==='pending'){
                    return signupSucess()
                }
               signupFailure({error:'error in sending otp'})
               }
                ),
            catchError((error)=>{
                console.log(error); 
                return of(signupFailure({error:error}))
            })
        )
        )
    )
})


}