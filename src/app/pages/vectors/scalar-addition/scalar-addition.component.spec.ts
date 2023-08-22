import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalarAdditionComponent } from './scalar-addition.component';

describe('ScalarAdditionComponent', () => {
  let component: ScalarAdditionComponent;
  let fixture: ComponentFixture<ScalarAdditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScalarAdditionComponent]
    });
    fixture = TestBed.createComponent(ScalarAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
