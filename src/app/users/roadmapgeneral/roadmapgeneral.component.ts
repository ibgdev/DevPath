import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-roadmapgeneral',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './roadmapgeneral.component.html',
  styleUrl: './roadmapgeneral.component.scss'
})
export class RoadmapgeneralComponent {

}
