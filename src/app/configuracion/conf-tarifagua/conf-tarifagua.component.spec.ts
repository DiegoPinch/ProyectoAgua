import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfTarifaguaComponent } from './conf-tarifagua.component';

describe('ConfTarifaguaComponent', () => {
  let component: ConfTarifaguaComponent;
  let fixture: ComponentFixture<ConfTarifaguaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfTarifaguaComponent]
    });
    fixture = TestBed.createComponent(ConfTarifaguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
