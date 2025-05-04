import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CoursesService } from './../../Services/courses.service';
import { ProgressionService } from './../../Services/progression.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.scss'
})
export class CourseOverviewComponent implements OnInit {
  @Input() courseId = 0;
  course: any;
  user = JSON.parse(sessionStorage.getItem("user") || '{}');

  /** false = show “Register” UI; true = show “Finished” UI */
  isRegisteredOrCompleted = false;

  constructor(
    private coursesService: CoursesService,
    private progressionService: ProgressionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourse();
  }

  private loadCourse() {
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (course) => this.course = course,
      error: (err) => console.error('Error fetching course info:', err)
    });
  }

  registerToCourse() {
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/auth"]);
      return;
    }

    const payload = {
      utilisateur_id: this.user.id,
      cours_id: this.courseId
    };

    this.progressionService.registerToCourse(payload).subscribe({
      next: (res: any) => {
        const msg = res.message || '';

        // Mark as registered/completed so template flips to the finish block
        this.isRegisteredOrCompleted = true;

        if (msg === 'Course registration successful.') {
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie',
            text: 'Vous êtes inscrit à ce cours.',
            confirmButtonColor: '#4361ee'
          }).then(() => window.location.reload());
        } else {
          // covers "already registered" or any other success message
          Swal.fire({
            icon: 'info',
            title: 'Déjà inscrit ou complété',
            text: 'Vous êtes déjà inscrit ou avez déjà terminé ce cours.',
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
