import { TestBed } from '@angular/core/testing';

import { PerfilUService } from './perfil-u.service';

describe('PerfilUService', () => {
  let service: PerfilUService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilUService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
