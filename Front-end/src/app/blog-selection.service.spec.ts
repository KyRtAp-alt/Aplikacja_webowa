import { TestBed } from '@angular/core/testing';

import { BlogSelectionService } from './blog-selection.service';

describe('BlogSelectionService', () => {
  let service: BlogSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
