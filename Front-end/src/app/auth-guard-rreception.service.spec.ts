import { TestBed } from '@angular/core/testing';

import { AuthGuardRreceptionService } from './auth-guard-rreception.service';

describe('AuthGuardRreceptionService', () => {
  let service: AuthGuardRreceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardRreceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
