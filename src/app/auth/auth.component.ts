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
import Swal from 'sweetalert2';


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
    private router: Router
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
        const token = res.token;
        const user = res.user;

        this.authService.saveToken(token);

        this.router.navigate(['/']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.error || 'Please check your credentials and try again.'
        });
      }
    });

  }


  onRegister(email: string, password: string, username: string) {
    this.authService.register({ email, password, username }).subscribe({
      next: () => {
          Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You can now log in!',
          timer: 2000,
          showConfirmButton: false,
        });
        this.renderer.removeClass(this.containerRef.nativeElement, 'sign-up-mode');
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.error?.error || 'Please verify your details and try again.'
        });
      }
    });
  }
}
