import { Router } from "express";

export interface I_Route {
    router: Router;
    
    create();
}