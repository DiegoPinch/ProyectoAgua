import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrincialSesionesComponent } from './page-princial-sesiones.component';

describe('PagePrincialSesionesComponent', () => {
  let component: PagePrincialSesionesComponent;
  let fixture: ComponentFixture<PagePrincialSesionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePrincialSesionesComponent]
    });
    fixture = TestBed.createComponent(PagePrincialSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
