import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsPasivosComponent } from './list-clients-pasivos.component';

describe('ListClientsPasivosComponent', () => {
  let component: ListClientsPasivosComponent;
  let fixture: ComponentFixture<ListClientsPasivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClientsPasivosComponent]
    });
    fixture = TestBed.createComponent(ListClientsPasivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
