import { TestBed } from '@angular/core/testing';

import { ChantService } from './chant.service';

describe('ChantsService', () => {
  let service: ChantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
