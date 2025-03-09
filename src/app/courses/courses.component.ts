import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SharedModule,NavbarComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

}
