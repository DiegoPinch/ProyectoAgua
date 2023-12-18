import { TestBed } from '@angular/core/testing';

import { ServeLoginService } from './serve-login.service';

describe('ServeLoginService', () => {
  let service: ServeLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
