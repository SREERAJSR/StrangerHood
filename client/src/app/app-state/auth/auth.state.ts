    import { AuthStateInterface } from "src/app/models/state.models";

    export const authState:AuthStateInterface ={
        firstname:'',
        lastname:'',
        gender:'',
        mobile:'',
        email:'',
        isLoggedIn:false,
        token:'',
        signupError:'',
        loginError:'',
        otpVerficationError:''
    }