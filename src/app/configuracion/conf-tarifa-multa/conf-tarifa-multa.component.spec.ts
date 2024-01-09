import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfTarifaMultaComponent } from './conf-tarifa-multa.component';

describe('ConfTarifaMultaComponent', () => {
  let component: ConfTarifaMultaComponent;
  let fixture: ComponentFixture<ConfTarifaMultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfTarifaMultaComponent]
    });
    fixture = TestBed.createComponent(ConfTarifaMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
