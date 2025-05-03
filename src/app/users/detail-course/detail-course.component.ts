import { ProgressionService } from './../../Services/progression.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { VideosService } from './../../Services/videos.service';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { YoutubeplayerComponent } from "../../youtubeplayer/youtubeplayer.component";
import { SharedModule } from '../../shared/shared.module';
import { CourseOverviewComponent } from "../course-overview/course-overview.component";

@Component({
  selector: 'app-detail-course',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, YoutubeplayerComponent, SharedModule, CourseOverviewComponent],
  templateUrl: './detail-course.component.html',
  styleUrl: './detail-course.component.scss'
})
export class DetailCourseComponent implements OnInit {
  course_videos: any[] = [];
  currentVideoIndex: number = 0;
  courseId: number = 0;
  isRegistered: boolean = false;
  user = JSON.parse(sessionStorage.getItem("user") || '{}');

  constructor(
    private progressionService: ProgressionService,
    private videosService: VideosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get courseId from URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = +idParam;
      this.fetchVideos();
      this.checkRegistration();
    } else {
      console.error('Course ID not found in route');
    }
  }

  //Get all videos of the course
  fetchVideos(): void {
    this.videosService.getVideosByCourseId(this.courseId).subscribe(
      (response) => {
        this.course_videos = response;
      },
      (error) => {
        console.error('Error fetching videos:', error);
      }
    );
  }

  //check if the user registred to the course or not
  checkRegistration(): void {
    this.progressionService.chechRegistration(this.user.id, this.courseId).subscribe(
      (response) => {
        console.log('Registration check response:', response);

        // Check if the response contains the expected properties
        if (response && response.statut && response.pourcentage !== undefined) {
          // Update registration status and progression data
          this.isRegistered = response.statut === 'registered';
          console.log('Registration status:', this.isRegistered);
          console.log('Progress percentage:', response.pourcentage);
        } else {
          console.error('Invalid response structure:', response);
        }
      },
      (error) => {
        console.error('Registration check failed:', error);
      }
    );
  }


  goToPrevious(): void {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
    }
  }

  goToNext(): void {
    if (this.currentVideoIndex < this.course_videos.length - 1) {
      this.currentVideoIndex++;
    }
  }

  //TODO : progression algo rlated to database
  calculateProgress(): number {
    if (this.course_videos.length === 0) {
      return 0;
    }
    return Math.round(((this.currentVideoIndex + 1) / this.course_videos.length) * 100);
  }
}
