import { CoursesService } from '../../Services/courses.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SharedModule } from '../../shared/shared.module';
import { FooterComponent } from "../../footer/footer.component";
import { CourseCaredComponent } from "../course-cared/course-cared.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SharedModule, NavbarComponent, FooterComponent, CourseCaredComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }
  ngOnInit() {
    this.getCourses();
  }

  courses = <any>[];

  getCourses() {
    this.coursesService.getCourses().subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    });
  }
}
