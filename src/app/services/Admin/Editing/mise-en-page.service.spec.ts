import { TestBed } from '@angular/core/testing';

import { MiseEnPageService } from './mise-en-page.service';

describe('MiseEnPageService', () => {
  let service: MiseEnPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiseEnPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
