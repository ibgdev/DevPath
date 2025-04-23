import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressionService {
  //TODO : Progression backend
  private baseUrl = 'https://localhost:8000/api/progression';

  constructor(private http: HttpClient) { }

  chechRegistration(userId: number, courseId: number): Observable<{ registered: boolean }> {
    return this.http.get<{ registered: boolean }>(`${this.baseUrl}/check?user_id=${userId}&cours_id=${courseId}`);
  }

  registerToCourse(data: {
    utilisateur_id: number;
    cours_id: number;
    status: string;
    prog_pourcentage: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
