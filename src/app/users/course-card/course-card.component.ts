import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-cared',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCaredComponent {

  @Input() course: any;

  constructor(private router: Router) { }

  toCours(Courseid: number) {
    this.router.navigate(['/course-details', Courseid]);
  }
}
