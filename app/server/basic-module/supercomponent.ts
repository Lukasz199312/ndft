//import { User } from '../user/user';
import { Component } from './component';
import { Module } from './module';

export abstract class SuperComponent<T extends Module> extends Component <T>{

    protected callback: (data, Component?: T, optionalData?) => void;

    public addCallback(callback: (data, Component?: T, optionalData?) => void): void {
        this.callback = callback;
    }
}