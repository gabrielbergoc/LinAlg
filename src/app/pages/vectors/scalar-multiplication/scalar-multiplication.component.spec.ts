import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalarMultiplicationComponent } from './scalar-multiplication.component';

describe('ScalarMultiplicationComponent', () => {
  let component: ScalarMultiplicationComponent;
  let fixture: ComponentFixture<ScalarMultiplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScalarMultiplicationComponent]
    });
    fixture = TestBed.createComponent(ScalarMultiplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
