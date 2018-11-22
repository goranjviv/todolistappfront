import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login-response';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  get token() {
    let _token = localStorage.getItem('token');
    return _token !== null ? _token : '';
  }
  get userEmail() {
    let _userEmail = localStorage.getItem('userEmail');
    return _userEmail !== null ? _userEmail : '';
  }

  constructor(
    private jwtHelperService: JwtHelperService,
    private httpClient: HttpClient,
    private router: Router,
    private messagesService: MessagesService
    ) {}

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
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    }));
  }

  logout(): void {
    //jednostavno obrisi _token
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.router.navigate(['login']);
    this.messagesService.clear();
    this.messagesService.push("Logout successful!");
  }

  register(): Observable<any> {
    //TODO: zahtev na register, zapamti vracen _token i emal
    //email radi prikaza

    return null;
  }

  isLoggedIn(): boolean {
    //token ce biti inicijalizovan prilikom pokretanja aplikacije, 
    //pre bilo kakve provere rute
    return !this.jwtHelperService.isTokenExpired(this.token);
  }

  ngOnInit() {}

}
