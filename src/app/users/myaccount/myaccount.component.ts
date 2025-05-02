import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../navbar/navbar.component'; 
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,FormsModule],
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent {

  name: string = 'User Example';
  password: string = '';
  email: string = 'exampleuser@domain.com';
  originalName: string = this.name;
  originalPassword: string = '';
  
  constructor(private router: Router) {}

  saveChanges() {
    console.log('Nom:', this.name);
    console.log('Mot de passe:', this.password);
   //service http
  }

  cancelChanges() {
    this.name = this.originalName;
    this.password = this.originalPassword;
  }

  deleteAccount() {
    const confirmed = confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (confirmed) {
//service http     
      this.router.navigate(['/']); 
    }
  }
}
