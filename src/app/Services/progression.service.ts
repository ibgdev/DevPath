import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressionService {
  //TODO : Progression backend
  private baseUrl = 'http://localhost:8000/api/progression';

  constructor(private http: HttpClient) { }

  chechRegistration(userId: number, courseId: number): Observable<ProgressionResponse> {
    return this.http.get<ProgressionResponse>(`${this.baseUrl}/check?user_id=${userId}&cours_id=${courseId}`);
  }

  registerToCourse(data: {
    utilisateur_id: number;
    cours_id: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}

export interface ProgressionResponse {
  statut: string;
  pourcentage: number;
  updated_at: string;
}

