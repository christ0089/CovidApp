import { TestBed } from '@angular/core/testing';

import { NavServiceService } from './nav-service.service';

describe('NavServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavServiceService = TestBed.get(NavServiceService);
    expect(service).toBeTruthy();
  });
});
