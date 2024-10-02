import { TestBed } from '@angular/core/testing';

import { ServiciosUnionService } from './servicios-union.service';

describe('ServiciosUnionService', () => {
  let service: ServiciosUnionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosUnionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
