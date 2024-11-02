import { TestBed } from '@angular/core/testing';

import { CalendarioSService } from './calendario-s.service';

describe('CalendarioSService', () => {
  let service: CalendarioSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
