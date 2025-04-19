import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http : HttpClient) { }

  api_getCourses = "http://localhost:8000/api/courses";

  getCourses() {
    return this.http.get<any>(this.api_getCourses);
  }
}
