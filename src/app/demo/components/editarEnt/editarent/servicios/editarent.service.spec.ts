import { TestBed } from '@angular/core/testing';

import { EditarentService } from './editarent.service';

describe('EditarentService', () => {
  let service: EditarentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
