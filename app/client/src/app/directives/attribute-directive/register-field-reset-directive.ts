import { Directive, Input, HostListener } from '@angular/core';
import { RegisterModalComponent } from "../../welcome-module/nav-bar/register-modal/register-modal.component";

@Directive({
    selector: '[rfr-directive]',
    exportAs: 'rfr-directive'
})
export class RegisterFieldResetDirective {
    private registerModalComponent: RegisterModalComponent;

    @HostListener('click') resetFormAfterClick() {
        this.resetForm();
    }

    public setRegisterModal(registerModalComponent: RegisterModalComponent) {
        this.registerModalComponent = registerModalComponent;
    }

    public resetForm() {
        this.registerModalComponent.resetAllField();
        this.registerModalComponent.resetAllMsg();
        this.registerModalComponent.clearAllStyle();
    }
}