import {Directive, ElementRef, Input, HostListener} from '@angular/core';

@Directive({
    selector: '[testd]'
})
export class TestDirective {
    @Input() testN:string;

    constructor(private el: ElementRef) {
        console.log("HELLO WORLD");
        console.log(el);
    }

    @HostListener('mouseenter') onMouseEnter() {
        console.log('Hue hue hue');
      }
}