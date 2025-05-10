import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/change-infos';

  constructor(private http: HttpClient) {}

  updateUser(userData: {
    id: number,
    username: string,
    email: string,
    password?: string
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, userData, { headers });
  }
}
