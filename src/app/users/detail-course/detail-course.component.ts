import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressionService } from './../../Services/progression.service';
import { VideosService } from './../../Services/videos.service';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { YoutubeplayerComponent } from "../../youtubeplayer/youtubeplayer.component";
import { SharedModule } from '../../shared/shared.module';
import { CourseOverviewComponent } from "../course-overview/course-overview.component";

@Component({
  selector: 'app-detail-course',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    YoutubeplayerComponent,
    SharedModule,
    CourseOverviewComponent
  ],
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss']
})
export class DetailCourseComponent implements OnInit {
  course_videos: any[] = [];
  currentVideoIndex = 0;
  courseId = 0;
  isRegistered = false;
  progressionPercentage = 0;
  user = JSON.parse(sessionStorage.getItem('user') || '{}');

  constructor(
    private videosService: VideosService,
    private progressionService: ProgressionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = +idParam;
      this.fetchVideos();
    } else {
      console.error('Course ID not found in route');
    }
  }

  // 1) Load videos, then check registration/progression
  fetchVideos(): void {
    this.videosService.getVideosByCourseId(this.courseId).subscribe({
      next: (videos) => {
        this.course_videos = videos;
        this.checkRegistration();
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
      }
    });
  }

  // 2) Check registration and restore last‐watched index & percentage
  checkRegistration(): void {
    this.progressionService.chechRegistration(this.user.id, this.courseId)
      .subscribe({
        next: (res: any) => {
          this.isRegistered = res.statut === 'registered';
          this.progressionPercentage = res.pourcentage;

          // derive last index from percentage
          const total = this.course_videos.length;
          const idx = Math.floor((res.pourcentage / 100) * total) - 1;
          this.currentVideoIndex = idx >= 0 ? idx : 0;
        },
        error: (err) => {
          console.error('Registration check failed:', err);
        }
      });
  }

  // 3) Navigate previous
  goToPrevious(): void {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
      this.updateProgression();
    }
  }

  // 4) Navigate next or finish
  onNextClick(): void {
    if (this.isLastVideo) {
      window.location.reload();
    } else {
      this.currentVideoIndex++;
      this.updateProgression();
    }
  }

  // 5) Send update to backend and pull new percentage
  private updateProgression(): void {
    const body = {
      utilisateur_id: this.user.id,
      cours_id: this.courseId,
      current_video_index: this.currentVideoIndex,
      total_videos: this.course_videos.length
    };

    this.progressionService.updateProgression(body).subscribe({
      next: (res: any) => {
        this.progressionPercentage = res.new_percentage;
      },
      error: (err) => {
        console.error('Failed to update progression:', err);
      }
    });
  }

  // Helper getter for template
  get isLastVideo(): boolean {
    return (
      this.course_videos.length > 0 &&
      this.currentVideoIndex === this.course_videos.length - 1
    );
  }
}
