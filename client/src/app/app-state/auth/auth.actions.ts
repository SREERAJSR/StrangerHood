import { createAction, props } from "@ngrx/store";
import { AuthStateInterface } from "src/app/models/state.models";
import { UserLoginActionProps, UserSignUpActionProps } from "src/app/models/user.models";

// Signup actions
export const signup = createAction('[Signup Page] Signup', props<{ payload: UserSignUpActionProps}>());
export const signupSucess = createAction('[Signup Page] Signup form submitted sucessfully');
export const signupFailure = createAction('[Signup Page] Signup Failure', props<{ error: any }>());

// OTP page actions
export const otpVerification = createAction('[OTP Page] OTP Verification', props<{ otp: string }>());
export const otpVerificationSuccess = createAction('[OTP Page] OTP Verification Success',props<{payload:AuthStateInterface}>());
export const otpVerificationFailure = createAction('[OTP Page] OTP Verification Failure', props<{ error: any }>());

// Login actions
export const login = createAction('[Login Page] Login', props<{ payload: UserLoginActionProps }>());
export const loginSuccess = createAction('[Login Page] Login Success', props<{payload:AuthStateInterface }>());
export const loginFailure = createAction('[Login Page] Login Failure', props<{ error: any }>());
