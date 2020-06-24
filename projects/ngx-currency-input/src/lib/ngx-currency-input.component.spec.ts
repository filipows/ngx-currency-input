import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCurrencyInputComponent } from './ngx-currency-input.component';

describe('NgxCurrencyInputComponent', () => {
  let component: NgxCurrencyInputComponent;
  let fixture: ComponentFixture<NgxCurrencyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCurrencyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCurrencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
