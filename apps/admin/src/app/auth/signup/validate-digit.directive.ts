import { Directive, ElementRef } from "@angular/core";

@Directive({
    standalone: true,
    selector: '[appValidateDigit]',
})
export class ValidateDigitDirective {
    constructor(private inputElement: ElementRef) {
        this.inputElement.nativeElement.focus();
    }
}