import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarEditarDirectivaComponent } from './ingresar-editar-directiva.component';

describe('IngresarEditarDirectivaComponent', () => {
  let component: IngresarEditarDirectivaComponent;
  let fixture: ComponentFixture<IngresarEditarDirectivaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarEditarDirectivaComponent]
    });
    fixture = TestBed.createComponent(IngresarEditarDirectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
