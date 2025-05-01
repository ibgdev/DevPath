import { RoadmapsService } from './../../Services/roadmaps.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-roadmapgeneral',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
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
