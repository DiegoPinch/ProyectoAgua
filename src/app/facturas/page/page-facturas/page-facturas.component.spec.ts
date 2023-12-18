import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFacturasComponent } from './page-facturas.component';

describe('PageFacturasComponent', () => {
  let component: PageFacturasComponent;
  let fixture: ComponentFixture<PageFacturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFacturasComponent]
    });
    fixture = TestBed.createComponent(PageFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
