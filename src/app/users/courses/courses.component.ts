import { CoursesService } from '../../Services/courses.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SharedModule } from '../../shared/shared.module';
import { FooterComponent } from "../../footer/footer.component";
import { CourseCaredComponent } from "../course-cared/course-cared.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SharedModule, NavbarComponent, FooterComponent, CourseCaredComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  // réferancer le search bar
  @ViewChild('searchbar') searchbar!: ElementRef;

  //Les Cours et les cours filtrés
  courses: any[] = [];
  filterdCourses: any[] = [];
  searchTerms: string = '';

  //Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private coursesService: CoursesService) { }
  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses().subscribe((data) => {
      this.courses = data;
      this.filterdCourses = data;
    });
  }

  // filtrer les cours
  filterCourses() {
    this.filterdCourses = this.courses.filter(course => course.titre.toLowerCase().includes(this.searchTerms.toLowerCase()))
    this.currentPage = 1;
  }

  //pagination
  getPaginatedCourses() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filterdCourses.slice(start, end);
  }

  nextPage() {
    if(this.currentPage * this.itemsPerPage < this.filterdCourses.length){
      this.currentPage++;
      this.scrollToSearch();
    }
  }

  prevPage() {
    if(this.currentPage > 1){
      this.currentPage--;
      this.scrollToSearch();
    }
  }

  getTotalPages() {
    return Math.ceil(this.filterdCourses.length / this.itemsPerPage);
  }

  scrollToSearch() {
    if (this.searchbar) {
      this.searchbar.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
