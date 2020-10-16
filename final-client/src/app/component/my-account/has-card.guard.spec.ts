import { TestBed } from '@angular/core/testing';

import { HasCardGuard } from './has-card.guard';

describe('HasCardGuard', () => {
  let guard: HasCardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasCardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
