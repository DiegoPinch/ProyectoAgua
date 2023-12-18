import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLecturasComponent } from './page-lecturas.component';

describe('PageLecturasComponent', () => {
  let component: PageLecturasComponent;
  let fixture: ComponentFixture<PageLecturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageLecturasComponent]
    });
    fixture = TestBed.createComponent(PageLecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
