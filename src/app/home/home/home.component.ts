import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    tithi: string;
    nakshathra: string;
    yoga: string;
    karana: string;
    day: string;
    shaaliVahanaShaka: string;
    samvathsara: string;
    ruthu: string;
    sauraMasa: string;
    chaandraMasa: string;
    sunRise: string;
    dayTime: string;
    sunSet: string;
    moonSet: string;
    moonRise: string;
    raahuKaala: string;
    yamaKantaka: string;
    gulikaKaala: string;


    constructor(private route: ActivatedRoute, private router: Router,
            private formBuilder: FormBuilder) {
                this.tithi='Chathurdashi';
                this.day='SaturDay';
                this.nakshathra='Moola';
                this.yoga='Shobhana';
                this.karana='Taitila';

                this.shaaliVahanaShaka='1960';
                this.samvathsara='Vilambi';
                this.ruthu='Hemantha';
                this.sauraMasa='Meena';
                this.chaandraMasa='MargaShira';

                this.sunRise='05:54 AM';
                this.sunSet='06:35 PM';
                this.dayTime='12:02:10';
                this.moonRise='10:22:54';
                this.moonSet='21:11:56';

                this.raahuKaala='';
                this.gulikaKaala='';
                this.yamaKantaka='';
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

