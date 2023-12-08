import { createReducer, on } from "@ngrx/store";
import { authState } from "./auth.state";
import { login, loginFailure, loginSuccess, otpVerification, otpVerificationFailure, otpVerificationSuccess, signup, signupFailure, signupSucess } from "./auth.actions";

    export const authReducer = createReducer(authState,
        on(signup,(state,action)=>{
            return{
                ...state
            }
        }),
        on(signupSucess,(state)=>{
            return{
                ...state
            }
        }),
        on(signupFailure,(state,action)=>{
            return{
                ...state,
                signupError:action.error
            }
        }),
        on(otpVerificationFailure,(state,action)=>{
            return {
                ...state,
                otpVerficationError:action.error
            }
        }),
        on(otpVerificationSuccess,(state,action)=>{
            return{
                ...state,
                firstname:action.payload.firstname,
                lastname:action.payload.lastname,
                email:action.payload.email,
                mobile:action.payload.mobile,
                gender:action.payload.gender,
                token:action.payload.token,
                isLoggedIn:action.payload.isLoggedIn
            }
        }),
        on(login,(state,action)=>{
            return{
                ...state,
            }
        }),
        on(loginSuccess,(state,action)=>{
            return{
                ...state,
                firstname:action.payload.firstname,
                lastname:action.payload.lastname,
                email:action.payload.email,
                mobile:action.payload.mobile,
                gender:action.payload.gender,
                token:action.payload.token,
                isLoggedIn:action.payload.isLoggedIn
            

            }
        }),
        on(loginFailure,(state,action)=>{
            return{
                ...state,
                loginError:action.error
            }
        })
    )