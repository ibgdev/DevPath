import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapgeneralComponent } from './roadmapgeneral.component';

describe('RoadmapgeneralComponent', () => {
  let component: RoadmapgeneralComponent;
  let fixture: ComponentFixture<RoadmapgeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapgeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadmapgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
