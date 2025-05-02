import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Check if there's a token in localStorage to determine if the user is logged in
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.getUserInfo();  // Fetch user info if logged in
    }
  }

  logout() {
    this.authService.logout();  // Log out user by removing token
    this.isLoggedIn = false;    // Set logged-in status to false
    this.router.navigate(["/auth"]);  // Redirect to auth page
  }

  getUserInfo() {
    const userInfo = this.authService.getUserInfoFromToken();  // Decode token to get user info

    if (userInfo && userInfo.username) {
      this.authService.getUser(userInfo.username).subscribe({
        next: (user) => {
          this.user = user;  // Set user information
          localStorage.setItem('user', JSON.stringify(user));  // Store user data in localStorage
        },
        error: (err) => {
          console.error('Failed to fetch user information', err);
          alert('Failed to fetch user information');
        }
      });
    }
  }
}
