import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCobrarfacturaComponent } from './page-cobrarfactura.component';

describe('PageCobrarfacturaComponent', () => {
  let component: PageCobrarfacturaComponent;
  let fixture: ComponentFixture<PageCobrarfacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCobrarfacturaComponent]
    });
    fixture = TestBed.createComponent(PageCobrarfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
