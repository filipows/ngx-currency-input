import { TestBed } from '@angular/core/testing';

import { NgxCurrencyInputService } from './ngx-currency-input.service';

describe('NgxCurrencyInputService', () => {
  let service: NgxCurrencyInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCurrencyInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
