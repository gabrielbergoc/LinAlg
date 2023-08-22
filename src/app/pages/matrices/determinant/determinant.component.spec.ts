import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeterminantComponent } from './determinant.component';

describe('DeterminantComponent', () => {
  let component: DeterminantComponent;
  let fixture: ComponentFixture<DeterminantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeterminantComponent]
    });
    fixture = TestBed.createComponent(DeterminantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
