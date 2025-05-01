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

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('containerRef') containerRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

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
}
