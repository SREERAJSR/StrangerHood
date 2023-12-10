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
