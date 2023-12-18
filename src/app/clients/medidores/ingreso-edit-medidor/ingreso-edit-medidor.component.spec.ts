import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoEditMedidorComponent } from './ingreso-edit-medidor.component';

describe('IngresoEditMedidorComponent', () => {
  let component: IngresoEditMedidorComponent;
  let fixture: ComponentFixture<IngresoEditMedidorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoEditMedidorComponent]
    });
    fixture = TestBed.createComponent(IngresoEditMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
