import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProgressionByUserResponse {
  cours_id: number;
  statut: string;
  pourcentage: number;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class ProgressionService {
  private baseUrl = 'http://localhost:8000/api/progression';

  constructor(private http: HttpClient) {}

  getProgressionsByUser(userId: number): Observable<ProgressionByUserResponse[]> {
    return this.http.get<ProgressionByUserResponse[]>(`${this.baseUrl}/user/${userId}`);
  }

  chechRegistration(userId: number, courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/check?user_id=${userId}&cours_id=${courseId}`);
  }

  registerToCourse(data: { utilisateur_id: number; cours_id: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  updateProgression(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, data);
  }
}
