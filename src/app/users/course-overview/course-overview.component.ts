import { ProgressionService } from './../../Services/progression.service';
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
  user = JSON.parse(localStorage.getItem("user") || '{}');
  @Input() courseId: number = 0;
  constructor(private coursesService: CoursesService, private progressionService : ProgressionService) { }
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

  registerToCourse() {
    const data = {
      utilisateur_id: this.user?.id,
      cours_id: this.courseId
    };
    this.progressionService.registerToCourse(data).subscribe({
      next: (res) => {
        alert('Inscription réussie au cours !');
        window.location.reload();
      },
      error: (err) => {
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    });
  }



}
