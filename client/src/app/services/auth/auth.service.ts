import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private jwtHelper = new JwtHelperService();

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    
    if(!token) {
      return of(false);
    }

    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return of(!isTokenExpired);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  
}
