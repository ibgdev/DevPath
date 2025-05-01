import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  api_getCourses = "http://localhost:8000/api/courses";

  getCourses(): Observable<any> {
    return this.http.get<any>(this.api_getCourses);
  }
  getRecentCourses(): Observable<any> {
    return this.http.get<any>(`${this.api_getCourses}/recent`)
  }
  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.api_getCourses}/${courseId}`);
  }
}
