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
  progressionPercentage: number = 0;

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

  // Get all videos of the course
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

  // Check if the user is registered to the course
  checkRegistration(): void {
    this.progressionService.chechRegistration(this.user.id, this.courseId).subscribe(
      (response) => {
        this.isRegistered = response.statut === 'registered';
        this.progressionPercentage = response.pourcentage;
        // derive last index (rounding down)
        const total = this.course_videos.length;
        const idx = Math.floor((response.pourcentage / 100) * total) - 1;
        this.currentVideoIndex = idx >= 0 ? idx : 0;
      },
      (error) => {
        console.error('Registration check failed:', error);
      }
    );
  }

  // Go to next video
  goToNext(): void {
    if (this.currentVideoIndex < this.course_videos.length - 1) {
      this.currentVideoIndex++;
      this.updateProgression();
    }
  }

  // Go to previous video
  goToPrevious(): void {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
      this.updateProgression();
    }
  }

  // Update the progression in the backend and fetch the updated percentage
  updateProgression(): void {
    const body = {
      utilisateur_id: this.user.id,
      cours_id: this.courseId,
      current_video_index: this.currentVideoIndex,
      total_videos: this.course_videos.length
    };

    this.progressionService.updateProgression(body).subscribe({
      next: (response: any) => {
        console.log('Progression updated:', response);
        // read the correct key:
        this.progressionPercentage = response.new_percentage;
      },
      error: (err) => {
        console.error('Failed to update progression:', err);
      }
    });

  }
}

