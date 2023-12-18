import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirDialogoComponent } from './abrir-dialogo.component';

describe('AbrirDialogoComponent', () => {
  let component: AbrirDialogoComponent;
  let fixture: ComponentFixture<AbrirDialogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbrirDialogoComponent]
    });
    fixture = TestBed.createComponent(AbrirDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
