import { AfterViewInit, Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'app-youtubeplayer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './youtubeplayer.component.html',
  styleUrls: ['./youtubeplayer.component.scss']
})
export class YoutubeplayerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() videoUrl: string = 'https://youtu.be/e8cCHXMoOIs'; // Default URL if none is passed
  player: any;

  ngOnInit() {
    console.log('Initial video URL:', this.videoUrl);
  }

  ngAfterViewInit() {
    this.loadYouTubeAPI();
  }

  // Detect changes to the videoUrl input and load the new video if the player is ready
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoUrl'] && !changes['videoUrl'].firstChange) {
      const newUrl = changes['videoUrl'].currentValue;
      const videoId = this.extractVideoID(newUrl);
      if (this.player && videoId) {
        console.log('Input changed. Loading new video:', videoId);
        this.player.loadVideoById(videoId);
      }
    }
  }

  loadYouTubeAPI() {
    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API Loaded');
        this.createPlayer();
      };
    } else {
      this.createPlayer();
    }
  }

  createPlayer() {
    const videoId = this.extractVideoID(this.videoUrl);
    console.log('Creating player with videoId:', videoId);
    this.player = new window.YT.Player('player', {
      height: '520',
      width: '980',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 1
      },
      events: {
        onReady: (event: any) => {
          console.log('Player ready, playing video...');
          event.target.playVideo();
        }
      }
    });
  }

  extractVideoID(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.*|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    console.log('Regex match:', match);
    return match ? match[1] : null;
  }

  // Manual trigger in case you need it
  playVideo() {
    const videoId = this.extractVideoID(this.videoUrl);
    if (videoId) {
      console.log('Manually playing video:', videoId);
      if (this.player && typeof this.player.loadVideoById === 'function') {
        this.player.loadVideoById(videoId);
      } else {
        console.log('Player is not ready yet.');
      }
    } else {
      alert('Invalid YouTube URL!');
    }
  }
}
