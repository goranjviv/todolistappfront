import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login-response';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get token() {
    return localStorage.getItem('token');
  }
  get userEmail() {
    return localStorage.getItem('userEmail');
  }

  constructor(
    private jwtHelperService: JwtHelperService,
    private httpClient: HttpClient,
    private router: Router
    ) {
      localStorage.setItem('token', '');
      localStorage.setItem('userEmail', ''); 
    }

  login(email: string, password: string): Observable<LoginResponse> {
    //login request
    //zapamti vracen _token i email
    return this.httpClient.post<LoginResponse>(
      '/login', 
      { email: email, password: password }
    ).pipe(tap(loginResponse => {
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('userEmail', email);
    },
    error => {
      console.log(error);
      localStorage.setItem('token', '');
      localStorage.setItem('userEmail', '');
    }));
  }

  logout(): void {
    //jednostavno obrisi _token
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');
    this.router.navigate(['login']);
  }

  register(): Observable<any> {
    //TODO: zahtev na register, zapamti vracen _token i emal
    //email radi prikaza

    return null;
  }

  isLoggedIn(): boolean {
    console.log('is logged in');
    //token ce biti inicijalizovan prilikom pokretanja aplikacije, 
    //pre bilo kakve provere rute
    return !this.jwtHelperService.isTokenExpired(this.token);
  }

}
