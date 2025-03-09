import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeplayerComponent } from './youtubeplayer.component';

describe('YoutubeplayerComponent', () => {
  let component: YoutubeplayerComponent;
  let fixture: ComponentFixture<YoutubeplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
