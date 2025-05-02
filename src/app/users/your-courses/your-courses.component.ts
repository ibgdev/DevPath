import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../navbar/navbar.component'; 
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-your-courses',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,FormsModule],
  templateUrl: './your-courses.component.html',
  styleUrl: './your-courses.component.scss'
})
export class YourCoursesComponent {

}
