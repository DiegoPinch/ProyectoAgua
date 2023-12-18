import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfacturaComponent } from './dialogfactura.component';

describe('DialogfacturaComponent', () => {
  let component: DialogfacturaComponent;
  let fixture: ComponentFixture<DialogfacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogfacturaComponent]
    });
    fixture = TestBed.createComponent(DialogfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
