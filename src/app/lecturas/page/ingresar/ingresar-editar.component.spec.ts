import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarEditarComponent } from './ingresar-editar.component';

describe('IngresarEditarComponent', () => {
  let component: IngresarEditarComponent;
  let fixture: ComponentFixture<IngresarEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarEditarComponent]
    });
    fixture = TestBed.createComponent(IngresarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
