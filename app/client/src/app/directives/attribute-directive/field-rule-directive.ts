import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ElementComponent } from "../../src/element-component/element-component";
import { I_ValueBox } from "../../src/element-component/i-value-box";
import { FieldRule } from "../../src/element-component/rules/field-rule";

@Directive({
    selector: '[field-rule-directive]',
    exportAs: 'kurwa',
    providers: []
})
export class FieldRuleDirective {
    @Input() elementRule: FieldRule<I_ValueBox>;
    @Input() color: string;
    //private nativeElement: Node;
    
    constructor(private element: ElementRef) {
        this.element.nativeElement.style.backgroundColor = 'red';
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.element.nativeElement.style.backgroundColor = ( this.color || 'white');
    }

    @HostListener('input') Input() {
        this.element.nativeElement.style.backgroundColor = ( this.color || 'black');
    }

    public setListener(color: string) {
        this.element.nativeElement.style.backgroundColor = color;
    }
}