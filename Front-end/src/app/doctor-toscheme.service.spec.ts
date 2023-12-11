import { TestBed } from '@angular/core/testing';

import { DoctorToschemeService } from './doctor-toscheme.service';

describe('DoctorToschemeService', () => {
  let service: DoctorToschemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorToschemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
