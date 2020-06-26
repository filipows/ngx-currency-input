import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

import { CurrencyInputDirective } from './ngx-currency-input.directive';

const elementRefMock: ElementRef = {
  nativeElement: {}
};

const injectorMock = {
  get() {}
};

describe('CurrencyInputDirective', () => {
  beforeAll(() => {
    registerLocaleData(localePl);
  });

  it('formating to up to 2 decimal places should work correctly in en locale', () => {
    const decimalPipe = new DecimalPipe('en');
    const currencyDirective = new CurrencyInputDirective(decimalPipe, elementRefMock, null, injectorMock);

    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234.00')).toBe('1,234.00');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234.0')).toBe('1,234.0');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234.')).toBe('1,234');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234.01')).toBe('1,234.01');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234.00000')).toBe('1,234.00');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234')).toBe('1,234');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234.1')).toBe('1,234.1');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234.10')).toBe('1,234.10');
  });

  it('formating to up to 2 decimal places should work correctly in pl locale', () => {
    const decimalPipe = new DecimalPipe('pl');
    const currencyDirective = new CurrencyInputDirective(decimalPipe, elementRefMock, null, injectorMock);

    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234,00')).toBe('1 234,00');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234,0')).toBe('1 234,0');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234,')).toBe('1 234');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234,01')).toBe('1 234,01');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234,00000')).toBe('1 234,00');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234')).toBe('1 234');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234,1')).toBe('1 234,1');
    expect(currencyDirective['formatPriceToUpTo2Decimal']('1234,10')).toBe('1 234,10');
  });

  it('parseLocaleStringToNumber should work correctly in en locale', () => {
    const decimalPipe = new DecimalPipe('en');
    const currencyDirective = new CurrencyInputDirective(decimalPipe, elementRefMock, null, injectorMock);

    expect(currencyDirective['parseLocaleStringToNumber']('1234.00')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234.0')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234.')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234.01')).toBe(1234.01);
    expect(currencyDirective['parseLocaleStringToNumber']('1234.00000')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234.1')).toBe(1234.1);
    expect(currencyDirective['parseLocaleStringToNumber']('1234.10')).toBe(1234.1);
  });

  it('parseLocaleStringToNumber should work correctly in pl locale', () => {
    const decimalPipe = new DecimalPipe('pl');
    const currencyDirective = new CurrencyInputDirective(decimalPipe, elementRefMock, null, injectorMock);

    expect(currencyDirective['parseLocaleStringToNumber']('1234,00')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234,0')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234,')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234,01')).toBe(1234.01);
    expect(currencyDirective['parseLocaleStringToNumber']('1234,00000')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234')).toBe(1234);
    expect(currencyDirective['parseLocaleStringToNumber']('1234,1')).toBe(1234.1);
    expect(currencyDirective['parseLocaleStringToNumber']('1234,10')).toBe(1234.1);
  });
});
