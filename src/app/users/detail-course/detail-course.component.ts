import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { VideosService } from './../../Services/videos.service';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { YoutubeplayerComponent } from "../../youtubeplayer/youtubeplayer.component";
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-detail-course',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, YoutubeplayerComponent, SharedModule],
  templateUrl: './detail-course.component.html',
  styleUrl: './detail-course.component.scss'
})
export class DetailCourseComponent implements OnInit {
  videos: any[] = [];
  currentVideoIndex: number = 0;
  courseId: number = 0;

  constructor(
    private http: HttpClient,
    private videosService: VideosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get courseId from URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = +idParam; // convert string to number
      this.fetchVideos();
    } else {
      console.error('Course ID not found in route');
    }
  }

  fetchVideos(): void {
    this.videosService.getVideosByCourseId(this.courseId).subscribe(
      (response) => {
        this.videos = response;
      },
      (error) => {
        console.error('Error fetching videos:', error);
      }
    );
  }

  goToPrevious(): void {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
    }
  }

  goToNext(): void {
    if (this.currentVideoIndex < this.videos.length - 1) {
      this.currentVideoIndex++;
    }
  }

  calculateProgress(): number {
    if (this.videos.length === 0) {
      return 0;
    }
    return Math.round(((this.currentVideoIndex + 1) / this.videos.length) * 100);
  }
}
