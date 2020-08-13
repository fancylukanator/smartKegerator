import { TestBed } from '@angular/core/testing';

import { TapsService } from './taps.service';

describe('TapsService', () => {
  let service: TapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
