import { createAction, props } from "@ngrx/store";
import { AuthStateInterface } from "src/app/models/state.models";
import { UserLoginActionProps, UserSignUpActionProps } from "src/app/models/user.models";

// user Signup actions
export const signup = createAction('[Signup Page] Signup', props<{ payload: UserSignUpActionProps}>());
export const signupSucess = createAction('[Signup Page] Signup form submitted sucessfully');
export const signupFailure = createAction('[Signup Page] Signup Failure', props<{ error: any }>());

// user OTP page actions
export const otpVerification = createAction('[OTP Page] OTP Verification', props<{ otp: string }>());
export const otpVerificationSuccess = createAction('[OTP Page] OTP Verification Success',props<{payload:AuthStateInterface}>());
export const otpVerificationFailure = createAction('[OTP Page] OTP Verification Failure', props<{ error: any }>());

// user Login actions
export const userlogin = createAction('[Login Page] Login', props<{payload:UserLoginActionProps}>());
export const loginSuccess = createAction('[Login Page] Login Success', props<{payload:AuthStateInterface }>());
export const loginFailure = createAction('[Login Page] Login Failure', props<{ error: any }>()); 
export const userLogout = createAction('[Auth]user Logout ')
export const navigateToOtp = createAction('[Auth] Navigate to OTP');
export const navigateToHome = createAction('[Auth] Navigate to Home');



//Admin login actions

export const adminLogin= createAction('[Admin login page]Login',props<{payload:UserLoginActionProps}>())
export const adminLoginSucess = createAction('[Admin login]Login page To admin Homepage',props<{payload:{admin:boolean}}>())
export const adminLoginFailure = createAction('[Admin login]Login page error',props<{error:any}>())
export const navigateAdminHomePage = createAction('[Admin navigate to Home page] Navigate to Homepage');
export const adminLogout = createAction('[Admin logout]admin logout button clicked')
export const adminLogoutsucess = createAction('[Admin logout]navigate to admin login page ')