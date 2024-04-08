import { TestBed } from '@angular/core/testing';

import { PredefinedMeasurementsService } from './predefined-measurements.service';

describe('PredefinedMeasurementsService', () => {
  let service: PredefinedMeasurementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefinedMeasurementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
