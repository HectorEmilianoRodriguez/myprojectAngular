import { TestBed } from '@angular/core/testing';

import { RecovertPasswordService } from './recovert-password.service';

describe('RecovertPasswordService', () => {
  let service: RecovertPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecovertPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
