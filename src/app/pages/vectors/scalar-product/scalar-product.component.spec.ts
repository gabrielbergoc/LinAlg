import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalarProductComponent } from './scalar-product.component';

describe('ScalarProductComponent', () => {
  let component: ScalarProductComponent;
  let fixture: ComponentFixture<ScalarProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScalarProductComponent]
    });
    fixture = TestBed.createComponent(ScalarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
