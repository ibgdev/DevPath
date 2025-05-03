import { RoadmapsService } from './../../Services/roadmaps.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roadmapgeneral',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule,RouterModule],
  templateUrl: './roadmapgeneral.component.html',
  styleUrl: './roadmapgeneral.component.scss'
})
export class RoadmapgeneralComponent implements OnInit {
  roadmaps: any[] = [];
  constructor(private roadmapsService: RoadmapsService){}
  ngOnInit(): void {
    this.getRoadmaps();
  }

  getRoadmaps(){
    this.roadmapsService.getRoadmaps().subscribe((data) => {
      this.roadmaps = data
    })
  }
}
