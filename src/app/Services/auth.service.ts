import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => {
        console.error('Login failed', error);
        return throwError(error);
      })
    );
  }

  register(data: { email: string, password: string, username: string }) {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      catchError(error => {
        console.error('Registration failed', error);
        return throwError(error);
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }

  getUser(username: string){
    return this.http.get<any>(`${this.apiUrl}/user/${username}`)
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token); // Using the correct function name
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
  }


  getUserInfoFromToken(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        this.logout(); // Token has expired, logout
        return null;
      }
      return decodedToken;
    }
    return null;
  }
}
