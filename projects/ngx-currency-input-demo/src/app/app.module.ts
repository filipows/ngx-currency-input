import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {NgxCurrencyInputModule} from '../../../ngx-currency-input/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxCurrencyInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
