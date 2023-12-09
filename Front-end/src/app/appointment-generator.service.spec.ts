import { TestBed } from '@angular/core/testing';

import { AppointmentGeneratorService } from './appointment-generator.service';

describe('AppointmentGeneratorService', () => {
  let service: AppointmentGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
