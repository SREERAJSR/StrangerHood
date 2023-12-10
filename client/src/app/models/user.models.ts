export interface UserSignUpActionProps{
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    gender:string,
    password:string,
    renteredpassword :string
}

export interface UserLoginActionProps{
    email:string|null,
    password:string|null
}