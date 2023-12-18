import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageeditarlecturasComponent } from './pageeditarlecturas.component';

describe('PageeditarlecturasComponent', () => {
  let component: PageeditarlecturasComponent;
  let fixture: ComponentFixture<PageeditarlecturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageeditarlecturasComponent]
    });
    fixture = TestBed.createComponent(PageeditarlecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
