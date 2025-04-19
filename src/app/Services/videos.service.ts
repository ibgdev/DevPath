import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private baseUrl = 'http://localhost:8000/api/courses';

  constructor(private http: HttpClient) {}
  getVideosByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/videos`);
  }
}
