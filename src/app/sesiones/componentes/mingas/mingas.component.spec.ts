import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MingasComponent } from './mingas.component';

describe('MingasComponent', () => {
  let component: MingasComponent;
  let fixture: ComponentFixture<MingasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MingasComponent]
    });
    fixture = TestBed.createComponent(MingasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
