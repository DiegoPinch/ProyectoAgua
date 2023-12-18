import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageImprimirfacturaComponent } from './page-imprimirfactura.component';

describe('PageImprimirfacturaComponent', () => {
  let component: PageImprimirfacturaComponent;
  let fixture: ComponentFixture<PageImprimirfacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageImprimirfacturaComponent]
    });
    fixture = TestBed.createComponent(PageImprimirfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
