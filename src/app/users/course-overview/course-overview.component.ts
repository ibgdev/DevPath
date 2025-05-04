import { ProgressionService } from './../../Services/progression.service';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from './../../Services/courses.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.scss'
})
export class CourseOverviewComponent implements OnInit {

  course: any;
  user = JSON.parse(sessionStorage.getItem("user") || '{}');
  @Input() courseId: number = 0;
  constructor(private coursesService: CoursesService, private progressionService : ProgressionService, private router : Router) { }
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
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/auth"]);
      return;
    }

    const data = {
      utilisateur_id: this.user?.id,
      cours_id: this.courseId
    };

    this.progressionService.registerToCourse(data).subscribe({
      next: (res) => {
        const message = res.message || '';
        if (message === 'Course registration successful.') {
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie',
            text: 'Vous êtes inscrit à ce cours.',
            confirmButtonColor: '#4361ee'
          }).then(() => {
            window.location.reload(); // recharger après le popup
          });
        } else if (message === 'User is already registered for this course.') {
          Swal.fire({
            icon: 'info',
            title: 'Déjà inscrit ou complété',
            text: 'Vous êtes complété ou déjà inscrit à ce cours.',
            confirmButtonColor: '#4361ee'
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l’inscription. Veuillez réessayer.',
          confirmButtonColor: '#ef233c'
        });
      }
    });
  }



}
