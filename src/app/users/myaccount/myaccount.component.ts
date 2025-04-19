import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.scss'
})
export class MyaccountComponent {

}
