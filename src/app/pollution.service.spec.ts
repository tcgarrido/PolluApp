import { TestBed } from '@angular/core/testing';

import { PollutionService } from './pollution.service';

describe('PollutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollutionService = TestBed.get(PollutionService);
    expect(service).toBeTruthy();
  });
});
