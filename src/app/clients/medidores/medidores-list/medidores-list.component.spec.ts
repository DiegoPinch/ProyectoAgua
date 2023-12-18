import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidoresListComponent } from './medidores-list.component';

describe('MedidoresListComponent', () => {
  let component: MedidoresListComponent;
  let fixture: ComponentFixture<MedidoresListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedidoresListComponent]
    });
    fixture = TestBed.createComponent(MedidoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
