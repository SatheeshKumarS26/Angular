import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Adminauthguard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    if (this.authService.currentUser && this.authService.currentUser.admin) {
      return true;
    } else {
      this.router.navigate(['/no-access']);
      return false;
    }
  }

}
