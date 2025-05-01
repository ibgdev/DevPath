import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoadmapsService {

  private baseUrl = 'http://localhost:8000/api/roadmaps';
  constructor(private http: HttpClient) { }

  getRoadmaps():Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
