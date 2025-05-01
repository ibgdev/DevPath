import { CoursesService } from './../Services/courses.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { CourseCaredComponent } from "../users/course-card/course-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CourseCaredComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  recentCourses: any[] = [];
  constructor(private coursesService: CoursesService) { }
  ngOnInit(): void {
    this.getRecentCourses();
  }

  getRecentCourses() {
    this.coursesService.getRecentCourses().subscribe((data) => {
      this.recentCourses = data;
    })
  }
}
