import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
// import { Subject } from "rxjs/Subject";
// import { ReplaySubject } from "rxjs/ReplaySubject";
// import { Scheduler } from "rxjs/Scheduler";
import { Observable } from 'rxjs/Rx';

// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/Just';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/interval';
// import 'rxjs/src/scheduler';
// import 'rxjs/operator/scan';
// import 'rxjs/add/operator/multicast';
// import 'rxjs/add/operator/throttleTime';
// import 'rxjs/scheduler/async';

@Component({
  selector: 'app-test',
  template: `
  <button type="button" class="btn btn-success">Click Me</button>
  <button type="button" class="btn btn-danger">Click Me</button>
  `,
  providers: []
})
export class TestComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    

  }

  constructor() {

  }
}