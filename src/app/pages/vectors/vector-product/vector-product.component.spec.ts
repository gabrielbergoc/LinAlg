import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorProductComponent } from './vector-product.component';

describe('VectorProductComponent', () => {
  let component: VectorProductComponent;
  let fixture: ComponentFixture<VectorProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VectorProductComponent]
    });
    fixture = TestBed.createComponent(VectorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
