import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from './../../Services/courses.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.scss'
})
export class CourseOverviewComponent implements OnInit {

  course: any;
  @Input() courseId: number = 0;
  constructor(private coursesService: CoursesService) { }
  ngOnInit(): void {
    this.getCourseInfos(this.courseId)
  }


  getCourseInfos(courseId: number) {
    this.coursesService.getCourseById(courseId).subscribe(
      (response) => {
        this.course = response;
      },
      (error) => {
        console.error('Error fetching course info:', error);
      }
    )
  }

  //TODO : Register to course algo
  registerToCourse() {
    throw new Error('Method not implemented.');
  }

}
