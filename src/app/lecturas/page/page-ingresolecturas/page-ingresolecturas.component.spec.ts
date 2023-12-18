import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIngresolecturasComponent } from './page-ingresolecturas.component';

describe('PageIngresolecturasComponent', () => {
  let component: PageIngresolecturasComponent;
  let fixture: ComponentFixture<PageIngresolecturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageIngresolecturasComponent]
    });
    fixture = TestBed.createComponent(PageIngresolecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
