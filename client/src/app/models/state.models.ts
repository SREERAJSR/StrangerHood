export interface AuthStateInterface{
    firstname?:string,
    lastname?:string,
    gender?:string,
    mobile?:number|string,
    email?:string,
    isLoggedIn?:boolean,
    token?:string,
    signupError?:string,
    loginError?:string,
    otpVerficationError?:string,
    admin?:boolean ,
    adminLoginError?:string
}