import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeokComponent } from './mensajeok.component';

describe('MensajeokComponent', () => {
  let component: MensajeokComponent;
  let fixture: ComponentFixture<MensajeokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeokComponent]
    });
    fixture = TestBed.createComponent(MensajeokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
