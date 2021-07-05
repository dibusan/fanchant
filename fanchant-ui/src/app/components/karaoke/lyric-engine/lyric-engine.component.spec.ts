import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricEngineComponent } from './lyric-engine.component';

describe('LyricEngineComponent', () => {
  let component: LyricEngineComponent;
  let fixture: ComponentFixture<LyricEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
