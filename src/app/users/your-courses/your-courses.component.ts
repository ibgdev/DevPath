import { Component, OnInit } from '@angular/core';
import { ProgressionService, ProgressionByUserResponse } from '../../Services/progression.service';
import { CoursesService } from '../../Services/courses.service';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-courses',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './your-courses.component.html',
  styleUrl: './your-courses.component.scss'
})
export class YourCoursesComponent implements OnInit {
  yourCourses: Array<{
    coursId: number;
    title: string;
    category: string;
    imageUrl: string;
    pourcentage: number;
    statut: string;
  }> = [];

  // for filtering
  filterStatus: 'all' | 'registered' | 'completed' = 'all';
  get filteredCourses() {
    if (this.filterStatus === 'all') {
      return this.yourCourses;
    }
    return this.yourCourses.filter(c => c.statut === this.filterStatus);
  }

  user = JSON.parse(sessionStorage.getItem('user') || '{}');

  constructor(
    private progressionService: ProgressionService,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.user?.id) {
      this.router.navigate(['/auth']);
      return;
    }

    this.progressionService.getProgressionsByUser(this.user.id).subscribe({
      next: (progs) => {
        progs.forEach((p) => {
          this.coursesService.getCourseById(p.cours_id).subscribe({
            next: (course) => {
              this.yourCourses.push({
                coursId: p.cours_id,
                title: course.titre,
                category: course.category || 'Development',
                imageUrl: course.image_url,
                pourcentage: p.pourcentage,
                statut: p.statut
              });
            },
            error: (err) => console.error('Error fetching course', err)
          });
        });
      },
      error: (err) => console.error('Error fetching progressions', err)
    });
  }

  // called when user clicks a filter tab
  setFilter(status: 'all' | 'registered' | 'completed') {
    this.filterStatus = status;
  }
}
