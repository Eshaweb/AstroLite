import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';


@Component({
    selector: 'app-match-making-report',
    templateUrl: './match-making-report.component.html',
    styleUrls: ['./match-making-report.component.scss']
})
export class MatchMakingReportComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
    /*
    */
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

}

