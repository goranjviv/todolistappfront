import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivate } from '@angular/router';

//blokira rute za koje korisnik mora biti ulogovan
//TODO: skinuti ovo provided in root i staviti u appModule providers
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
