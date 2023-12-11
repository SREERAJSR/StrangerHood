import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


export const userAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(AuthService)
  const router = inject(Router)

if(authService.getToken()){
  return true;
}else{
  router.navigate(['/login'])
  return false
}
  
};
export const adminAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(AuthService)
  const router = inject(Router)

if(authService.getAdminToken()){
  return true;
}else{
  router.navigate(['/admin_login'])
  return false
}
  
};

export const userLoginAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(AuthService)
  const router = inject(Router)

if(authService.getToken()){
  router.navigate(['/'])
  return false
}else{

  return true;
}

}
export const adminLoginAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(AuthService)
  const router = inject(Router)

if(authService.getAdminToken()){
  router.navigate(['/admin'])
  return false
}else{

  return true;
}

}
