import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http : HttpClient) { }

  api_getCourses = "https://67d57baed2c7857431f089a9.mockapi.io/test/courses";

  getCourses() {
    return this.http.get<any>(this.api_getCourses);
  }
}
