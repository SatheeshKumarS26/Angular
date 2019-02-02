import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Authguard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(router, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'], {queryParams : {returnUrl : state.url}});
      return false;
    }
  }

}
