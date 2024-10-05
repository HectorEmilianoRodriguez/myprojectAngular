import { TestBed } from '@angular/core/testing';

import { ServicioTCService } from './servicio-tc.service';

describe('ServicioTCService', () => {
  let service: ServicioTCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
