import {
  Component,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('containerRef') containerRef!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router  // Inject the Router for navigation
  ) { }

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement;
    const signUpBtn = container.querySelector('#sign-up-btn');
    const signInBtn = container.querySelector('#sign-in-btn');

    signUpBtn.addEventListener('click', () => {
      this.renderer.addClass(container, 'sign-up-mode');
    });

    signInBtn.addEventListener('click', () => {
      this.renderer.removeClass(container, 'sign-up-mode');
    });
  }

  onLogin(email: string, password: string) {
    this.authService.login({ email, password }).subscribe({
      next: (res: any) => {
        const token = res.token;         // ✅ reads the "token"
        const user = res.user;           // ✅ reads the "user" object

        this.authService.saveToken(token);   // Saves token in localStorage

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert(err.error?.error || 'Login failed.');
      }
    });

  }


  onRegister(email: string, password: string, username: string) {
    this.authService.register({ email, password, username }).subscribe({
      next: () => {
        alert('Registration successful. You can now log in.');
        // Optionally, you can redirect the user to the login page after successful registration
        this.renderer.removeClass(this.containerRef.nativeElement, 'sign-up-mode');
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert(err.error?.error || 'Registration failed.');
      }
    });
  }
}
