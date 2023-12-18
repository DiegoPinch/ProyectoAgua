import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDosfacturasComponent } from './page-dosfacturas.component';

describe('PageDosfacturasComponent', () => {
  let component: PageDosfacturasComponent;
  let fixture: ComponentFixture<PageDosfacturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageDosfacturasComponent]
    });
    fixture = TestBed.createComponent(PageDosfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
