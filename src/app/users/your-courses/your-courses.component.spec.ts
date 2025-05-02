import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCoursesComponent } from './your-courses.component';

describe('YourCoursesComponent', () => {
  let component: YourCoursesComponent;
  let fixture: ComponentFixture<YourCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
