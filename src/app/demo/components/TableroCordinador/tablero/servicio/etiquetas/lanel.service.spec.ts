import { TestBed } from '@angular/core/testing';

import { LanelService } from './lanel.service';

describe('LanelService', () => {
  let service: LanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
