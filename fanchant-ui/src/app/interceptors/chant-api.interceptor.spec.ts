import { TestBed } from '@angular/core/testing';

import { ChantApiInterceptor } from './chant-api.interceptor';

describe('ChantApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ChantApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ChantApiInterceptor = TestBed.inject(ChantApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
