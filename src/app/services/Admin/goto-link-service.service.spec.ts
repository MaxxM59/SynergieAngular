import { TestBed } from '@angular/core/testing';

import { GotoLinkServiceService } from './goto-link-service.service';

describe('GotoLinkServiceService', () => {
  let service: GotoLinkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GotoLinkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
