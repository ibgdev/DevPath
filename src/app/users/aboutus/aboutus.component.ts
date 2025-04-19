import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [NavbarComponent,FooterComponent], 
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'] 
})

export class AboutusComponent {}
