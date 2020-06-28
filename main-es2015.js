(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../ngx-currency-input/src/lib/ngx-currency-input.directive.ts":
/*!*********************************************************************!*\
  !*** ../ngx-currency-input/src/lib/ngx-currency-input.directive.ts ***!
  \*********************************************************************/
/*! exports provided: CurrencyInputDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyInputDirective", function() { return CurrencyInputDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");





const CURRENCYDIRECTIVE_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(() => CurrencyInputDirective),
    multi: true
};
const CURRENCYDIRECTIVE_VALIDAT0R = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(() => CurrencyInputDirective),
    multi: true
};
class CurrencyInputDirective {
    constructor(decimalPipe, elementRef, renderer, injector) {
        this.decimalPipe = decimalPipe;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.injector = injector;
        this.formatOnlyOnBlur = false;
        this.decimalPointSeparator = this.getLocaleDecimalPointSeparator();
        this.thousandsSeparator = this.getLocaleThousandsSeparator();
        this.allowedKeys = [
            'Backspace',
            'Tab',
            'End',
            'Home',
            'Delete',
            'Del',
            'Ctrl',
            'ArrowLeft',
            'ArrowRight',
            'Left',
            'Right'
        ];
        this.allowedKeysUsedWithControl = ['x', 'c', 'v', 'a', 'z'];
        this.numberWithUpTo2DecimalsRegex = new RegExp(`^([0-9]+)?(\\${this.decimalPointSeparator}[0-9]?[0-9]?)?$`);
        this.previousRawInputValue = '';
        const localeDecimalPointSeparator = this.getLocaleDecimalPointSeparator();
        this.numbersAndDecimalPointSeparatorRegex = new RegExp(`[0-9${localeDecimalPointSeparator}]`, 'g');
    }
    ngOnInit() {
        this.ngControl = this.injector.get(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"]);
    }
    handleBlur() {
        this.reformatInput();
        this.onTouch();
    }
    handleInput(rawInputValue, inputEl, event) {
        const enteredData = event.data;
        if (enteredData === this.decimalPointSeparator && this.hasOnlyOneDecimalSeparatorAtTheEnd(rawInputValue)) {
            return;
        }
        if (rawInputValue === '') {
            this.onChange('');
            return;
        }
        const initialCursorPosition = this.getCursorPosition(inputEl);
        if (this.hasNoMoreThan2DecimalDigits(rawInputValue) && !this.isNumberTooLarge(rawInputValue)) {
            const newRawInputValue = this.formatOnlyOnBlur ? rawInputValue : this.formatPriceToUpTo2Decimal(rawInputValue);
            this.previousRawInputValue = newRawInputValue;
            this.onChange(newRawInputValue);
            this.setNativeInputValue(newRawInputValue);
            const diffInSeparators = this.getDiffInSeparators(rawInputValue, newRawInputValue);
            this.moveCursor(inputEl, initialCursorPosition, diffInSeparators);
        }
        else if ((enteredData === null || enteredData === void 0 ? void 0 : enteredData.length) === 1 &&
            enteredData !== this.decimalPointSeparator &&
            initialCursorPosition.start !== (rawInputValue === null || rawInputValue === void 0 ? void 0 : rawInputValue.length) &&
            initialCursorPosition.end !== (rawInputValue === null || rawInputValue === void 0 ? void 0 : rawInputValue.length) &&
            !this.isNumberTooLarge(rawInputValue)) {
            // This section allows to override numbers after decimal point
            const newRawInputValue = this.replaceAt(this.previousRawInputValue, initialCursorPosition.start - 1, enteredData);
            this.previousRawInputValue = newRawInputValue;
            this.onChange(newRawInputValue);
            this.setNativeInputValue(newRawInputValue);
            this.moveCursor(inputEl, initialCursorPosition);
        }
        else {
            this.setNativeInputValue(this.previousRawInputValue);
            const cursorDiff = enteredData ? -enteredData.length : 0;
            this.moveCursor(inputEl, initialCursorPosition, cursorDiff);
        }
    }
    keyDownEvent(event) {
        if (this.isSpecialAllowedKey(event) || this.isNumberKey(event)) {
            return;
        }
        event.preventDefault();
    }
    isNumberTooLarge(rawInputValue) {
        const value = this.parseLocaleStringToNumber(rawInputValue);
        return value >= 10000000000000;
    }
    replaceAt(originalValue, index, replacement) {
        return originalValue.substr(0, index) + replacement + originalValue.substr(index + replacement.length);
    }
    isNumberKey(event) {
        return event.key && event.key.length === 1 && !!String(event.key).match(this.numbersAndDecimalPointSeparatorRegex);
    }
    isSpecialAllowedKey(event) {
        return this.allowedKeys.includes(event.key) || this.isAllowedKeyWithControl(event);
    }
    isAllowedKeyWithControl(event) {
        if (event.ctrlKey || event.metaKey) {
            return (this.allowedKeysUsedWithControl.includes(event.key) ||
                this.allowedKeysUsedWithControl.map((key) => key.toUpperCase()).includes(event.key));
        }
        else {
            return false;
        }
    }
    getValueWithoutThousandsSeparator(value) {
        return value.split(this.thousandsSeparator).join('');
    }
    hasNoMoreThan2DecimalDigits(value) {
        const valueWithoutSeparators = this.getValueWithoutThousandsSeparator(value);
        return this.numberWithUpTo2DecimalsRegex.test(valueWithoutSeparators);
    }
    reformatInput(value) {
        const newValue = value !== undefined ? value : this.ngControl.value;
        if (newValue || newValue === 0) {
            const with2Decimals = this.formatPriceTo2Decimal(newValue);
            this.setNativeInputValue(with2Decimals);
        }
        else {
            this.setNativeInputValue('');
        }
    }
    formatPriceTo2Decimal(value) {
        const numberToTransform = (typeof value === 'string' ? this.parseLocaleStringToNumber(value) : value) || 0;
        return this.decimalPipe.transform(numberToTransform, '1.2-2');
    }
    formatPriceToUpTo2Decimal(value) {
        var _a, _b;
        // TODO: potential for refactor:
        const numberOfZerosAfterDecimalPointRegex = `^[0-9]*\\${this.decimalPointSeparator}(0+)$`;
        const numberOfZerosAfterFirstDecimalDigitRegex = `^[0-9]*\\${this.decimalPointSeparator}[1-9](0+)$`;
        const valueWithoutSeparators = this.getValueWithoutThousandsSeparator(value);
        const numberOfZerosAfterDecimalPoint = ((_a = valueWithoutSeparators.match(numberOfZerosAfterDecimalPointRegex)) === null || _a === void 0 ? void 0 : _a[1].length) || 0;
        const numberOfZerosAfterFirstDecimalDigit = ((_b = valueWithoutSeparators.match(numberOfZerosAfterFirstDecimalDigitRegex)) === null || _b === void 0 ? void 0 : _b[1].length) || 0;
        const formatted = this.decimalPipe.transform(this.parseLocaleStringToNumber(valueWithoutSeparators), '1.0-2');
        if (numberOfZerosAfterDecimalPoint > 0) {
            return formatted + this.decimalPointSeparator + '00'.slice(0, numberOfZerosAfterDecimalPoint);
        }
        if (numberOfZerosAfterFirstDecimalDigit > 0) {
            return formatted + '0';
        }
        return formatted;
    }
    getNumberOfThousandsSeparators(value) {
        return (value || '').split(this.thousandsSeparator).length - 1;
    }
    getDiffInSeparators(oldValue, newValue) {
        const initialNumberOfSeparators = this.getNumberOfThousandsSeparators(oldValue);
        const currentNumberOfSeparators = this.getNumberOfThousandsSeparators(newValue);
        return currentNumberOfSeparators - initialNumberOfSeparators;
    }
    hasOnlyOneDecimalSeparatorAtTheEnd(value) {
        return value.split(this.decimalPointSeparator).length === 2 && value.slice(-1) === this.decimalPointSeparator;
    }
    parseLocaleStringToNumber(value) {
        const cleanPattern = new RegExp(`[^-+0-9${this.decimalPointSeparator}]`, 'g');
        const cleaned = String(value).replace(cleanPattern, '');
        const normalized = cleaned.replace(this.decimalPointSeparator, '.');
        return parseFloat(normalized);
    }
    setNativeInputValue(value) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    }
    getNativeInputValue() {
        return this.elementRef.nativeElement.value;
    }
    getCursorPosition(inputEl) {
        return {
            start: inputEl.selectionStart,
            end: inputEl.selectionEnd
        };
    }
    setCursorPosition(inputEl, position) {
        inputEl.setSelectionRange(position.start >= 0 ? position.start : 0, position.end >= 0 ? position.end : 0);
    }
    moveCursor(inputEl, initialPosition, diff = 0) {
        this.setCursorPosition(inputEl, {
            start: initialPosition.start + diff,
            end: initialPosition.end + diff
        });
    }
    numberOfDecimalPlaces(value) {
        var _a;
        const numString = value + '';
        return ((_a = numString.split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    }
    getLocaleDecimalPointSeparator() {
        const example = this.decimalPipe.transform(1.1, '1.1');
        return example.charAt(1);
    }
    getLocaleThousandsSeparator() {
        const example = this.decimalPipe.transform(1000, '1.0');
        if (example.length === 5) {
            return example.charAt(1);
        }
        else {
            return '';
        }
    }
    // Value Acecssor Methods:
    registerOnChange(fn) {
        this.onChange = (value) => {
            const valueToEmit = value === '' ? null : this.parseLocaleStringToNumber(value);
            console.log('Emitting value', valueToEmit);
            fn(valueToEmit);
        };
    }
    registerOnTouched(callbackFunction) {
        this.onTouch = callbackFunction;
    }
    setDisabledState(isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    }
    writeValue(value) {
        // Uncomment that if we want to emit coerced value to max 2 decimal points on write
        // for ex: setting a value i.e: 24.34335456 (whether should we emit immediately 23.34)
        // if (this.numberOfDecimalPlaces(normalizedValue) > 2) {
        //   setTimeout(() => {
        //     this.onChange(this.formatPriceTo2Decimal(normalizedValue));
        //   }, 1);
        // }
        this.reformatInput(value);
        this.previousRawInputValue = this.getNativeInputValue();
    }
    validate(control) {
        const errors = {};
        if (control.value > this.max) {
            errors.max = true;
        }
        if (control.value < this.min) {
            errors.min = true;
        }
        return Object.keys(errors).length === 0 ? null : errors;
    }
}
CurrencyInputDirective.ɵfac = function CurrencyInputDirective_Factory(t) { return new (t || CurrencyInputDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"])); };
CurrencyInputDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: CurrencyInputDirective, selectors: [["input", "formControlName", "", "ngxCurrencyInput", ""], ["input", "formControl", "", "ngxCurrencyInput", ""], ["input", "ngModel", "", "ngxCurrencyInput", ""]], hostBindings: function CurrencyInputDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("blur", function CurrencyInputDirective_blur_HostBindingHandler() { return ctx.handleBlur(); })("input", function CurrencyInputDirective_input_HostBindingHandler($event) { return ctx.handleInput($event.target.value, $event.target, $event); })("keydown", function CurrencyInputDirective_keydown_HostBindingHandler($event) { return ctx.keyDownEvent($event); });
    } }, inputs: { formatOnlyOnBlur: "formatOnlyOnBlur", min: "min", max: "max" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"], CURRENCYDIRECTIVE_VALUE_ACCESSOR, CURRENCYDIRECTIVE_VALIDAT0R])] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CurrencyInputDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: 'input[formControlName][ngxCurrencyInput], input[formControl][ngxCurrencyInput], input[ngModel][ngxCurrencyInput]',
                providers: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"], CURRENCYDIRECTIVE_VALUE_ACCESSOR, CURRENCYDIRECTIVE_VALIDAT0R]
            }]
    }], function () { return [{ type: _angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"] }]; }, { formatOnlyOnBlur: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], min: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], max: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], handleBlur: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['blur']
        }], handleInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['input', ['$event.target.value', '$event.target', '$event']]
        }], keyDownEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['keydown', ['$event']]
        }] }); })();


/***/ }),

/***/ "../ngx-currency-input/src/lib/ngx-currency-input.module.ts":
/*!******************************************************************!*\
  !*** ../ngx-currency-input/src/lib/ngx-currency-input.module.ts ***!
  \******************************************************************/
/*! exports provided: NgxCurrencyInputModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxCurrencyInputModule", function() { return NgxCurrencyInputModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ngx-currency-input.directive */ "../ngx-currency-input/src/lib/ngx-currency-input.directive.ts");



class NgxCurrencyInputModule {
}
NgxCurrencyInputModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NgxCurrencyInputModule });
NgxCurrencyInputModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function NgxCurrencyInputModule_Factory(t) { return new (t || NgxCurrencyInputModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NgxCurrencyInputModule, { declarations: [_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_1__["CurrencyInputDirective"]], exports: [_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_1__["CurrencyInputDirective"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxCurrencyInputModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_1__["CurrencyInputDirective"]],
                imports: [],
                exports: [_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_1__["CurrencyInputDirective"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "../ngx-currency-input/src/public-api.ts":
/*!***********************************************!*\
  !*** ../ngx-currency-input/src/public-api.ts ***!
  \***********************************************/
/*! exports provided: CurrencyInputDirective, NgxCurrencyInputModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/ngx-currency-input.directive */ "../ngx-currency-input/src/lib/ngx-currency-input.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CurrencyInputDirective", function() { return _lib_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_0__["CurrencyInputDirective"]; });

/* harmony import */ var _lib_ngx_currency_input_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/ngx-currency-input.module */ "../ngx-currency-input/src/lib/ngx-currency-input.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxCurrencyInputModule", function() { return _lib_ngx_currency_input_module__WEBPACK_IMPORTED_MODULE_1__["NgxCurrencyInputModule"]; });

/*
 * Public API Surface of ngx-currency-input
 */




/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ngx_currency_input_src_lib_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../ngx-currency-input/src/lib/ngx-currency-input.directive */ "../ngx-currency-input/src/lib/ngx-currency-input.directive.ts");




class AppComponent {
    constructor() {
        this.title = 'ngx-currency-input-demo';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 2, consts: [["ngxCurrencyInput", "", 3, "ngModel", "ngModelChange"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_0_listener($event) { return ctx.value = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Currency value: ", ctx.value, "\n");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _ngx_currency_input_src_lib_ngx_currency_input_directive__WEBPACK_IMPORTED_MODULE_2__["CurrencyInputDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModel"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9uZ3gtY3VycmVuY3ktaW5wdXQtZGVtby9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ngx_currency_input_src_public_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ngx-currency-input/src/public-api */ "../ngx-currency-input/src/public-api.ts");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ngx_currency_input_src_public_api__WEBPACK_IMPORTED_MODULE_4__["NgxCurrencyInputModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ngx_currency_input_src_public_api__WEBPACK_IMPORTED_MODULE_4__["NgxCurrencyInputModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
                imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ngx_currency_input_src_public_api__WEBPACK_IMPORTED_MODULE_4__["NgxCurrencyInputModule"]],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/filipows/ngx-currency-input/projects/ngx-currency-input-demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map