import { Component, ViewChild, OnInit } from '@angular/core';
import { RegisterFieldResetDirective } from "../../directives/attribute-directive/register-field-reset-directive";
import { RegisterModalComponent } from "./register-modal/register-modal.component";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit{
    @ViewChild('rfr') registerFieldResetDirective: RegisterFieldResetDirective;
    @ViewChild('rm')registerModalComponent: RegisterModalComponent;

    nav_bar_test = " Nav-bar work";


    public parse(ob: object) {
        console.log(ob);
    }

    ngOnInit(): void {
        this.registerFieldResetDirective.setRegisterModal(this.registerModalComponent);
    }
 }