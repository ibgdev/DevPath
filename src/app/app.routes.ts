import { Routes } from '@angular/router';
import { CoursesComponent } from './users/courses/courses.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { DetailCourseComponent } from './users/detail-course/detail-course.component';
import { AboutusComponent } from './users/aboutus/aboutus.component';
import { MyaccountComponent } from './users/myaccount/myaccount.component';
import { RoadmapgeneralComponent } from './users/roadmapgeneral/roadmapgeneral.component';
import { AuthComponent } from './auth/auth.component';
import {YourCoursesComponent} from './users/your-courses/your-courses.component';
import { CourseOverviewComponent } from './users/course-overview/course-overview.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'my-account', component: MyaccountComponent },
  { path: 'roadmaps', component: RoadmapgeneralComponent },
  { path: 'course-details/:id', component: DetailCourseComponent },
  { path: 'course-overview/:id', component: CourseOverviewComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'my-courses', component: YourCoursesComponent },
  { path: '**', component: NotFoundComponent }



];
