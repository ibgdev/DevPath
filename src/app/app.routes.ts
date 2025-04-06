import { Routes } from '@angular/router';
import { CoursesComponent } from './users/courses/courses.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'courses', component: CoursesComponent },
  { path: '**', component: NotFoundComponent }
];

