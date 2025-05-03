import { RoadmapsService } from './../Services/roadmaps.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roadmap-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './roadmap-details.component.html',
  styleUrl: './roadmap-details.component.scss'
})
export class RoadmapDetailsComponent implements OnInit{
  RoadmapId : number = 0;
  roadmap:any;
  courses: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roadmapsService: RoadmapsService
  ) {}

  ngOnInit(): void {
    // Get courseId from URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.RoadmapId = +idParam;
      this.getRoadmapinfo();
      this.getCourses();
    } else {
      console.error('Roadmap ID not found in route');
    }
  }
  goTocourse(id : number) {
    this.router.navigate(["/course-details/" + id])
  }

  getCourses(): void {
    this.roadmapsService.getCourses(this.RoadmapId).subscribe(
      (res) => {
        // Store the response data in the courses array
        this.courses = res;
      },
      (err) => {
        console.error('Error fetching courses:', err);
      }
    );
  }
  getMarkerColor(index: number): string {
    const colors = [
      '#4B49F2', // primary
      '#6C63FF', // secondary
      '#7B68EE', // medium slate blue
      '#9370DB', // medium purple
      '#8A2BE2'  // blue violet
    ];
    return colors[index % colors.length];
  }

  getRoadmapinfo(){
    this.roadmapsService.getRoadmapInfos(this.RoadmapId).subscribe({
      next: res => {
        this.roadmap = res;
      },
      error: ree => {
        this.roadmap = ree;
      }
    }
    )
  }
}
