import { TestBed, inject } from '@angular/core/testing';

import { InsuranceTypeService } from './insurance-type.service';

describe('InsuranceTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceTypeService]
    });
  });

  it('should be created', inject([InsuranceTypeService], (service: InsuranceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
