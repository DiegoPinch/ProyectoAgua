import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashfacturasComponent } from './dashfacturas.component';

describe('DashfacturasComponent', () => {
  let component: DashfacturasComponent;
  let fixture: ComponentFixture<DashfacturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashfacturasComponent]
    });
    fixture = TestBed.createComponent(DashfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
