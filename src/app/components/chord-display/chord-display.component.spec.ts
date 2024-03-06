import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordDisplayComponent } from './chord-display.component';

describe('ChordDisplayComponent', () => {
  let component: ChordDisplayComponent;
  let fixture: ComponentFixture<ChordDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChordDisplayComponent]
    });
    fixture = TestBed.createComponent(ChordDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
