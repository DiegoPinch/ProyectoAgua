import { TestBed } from '@angular/core/testing';

import { FechahoraService } from './fechahora.service';

describe('FechahoraService', () => {
  let service: FechahoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechahoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
