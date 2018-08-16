import { TestBed, inject } from '@angular/core/testing';

import { TransmissionTypeService } from './transmission-type.service';

describe('TransmissionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransmissionTypeService]
    });
  });

  it('should be created', inject([TransmissionTypeService], (service: TransmissionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
