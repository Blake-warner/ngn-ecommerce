import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsNavComponent } from './products-nav.component';

describe('ProductsNavComponent', () => {
  let component: ProductsNavComponent;
  let fixture: ComponentFixture<ProductsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
