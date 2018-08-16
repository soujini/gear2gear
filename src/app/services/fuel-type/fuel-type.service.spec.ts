import { TestBed, inject } from '@angular/core/testing';

import { FuelTypeService } from './fuel-type.service';

describe('FuelTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuelTypeService]
    });
  });

  it('should be created', inject([FuelTypeService], (service: FuelTypeService) => {
    expect(service).toBeTruthy();
  }));
});
