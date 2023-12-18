import { TestBed } from '@angular/core/testing';

import { ServeDetadminService } from './serve-detadmin.service';

describe('ServeDetadminService', () => {
  let service: ServeDetadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeDetadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
