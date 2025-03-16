import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCaredComponent } from './course-card.component';

describe('CourseCaredComponent', () => {
  let component: CourseCaredComponent;
  let fixture: ComponentFixture<CourseCaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCaredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
