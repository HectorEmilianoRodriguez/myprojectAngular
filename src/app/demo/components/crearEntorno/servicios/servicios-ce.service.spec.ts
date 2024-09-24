import { TestBed } from '@angular/core/testing';

import { ServiciosCEService } from './servicios-ce.service';

describe('ServiciosCEService', () => {
  let service: ServiciosCEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosCEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

