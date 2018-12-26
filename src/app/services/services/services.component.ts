import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Event,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';


@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    people: { id: string; name: string; }[];


    constructor(public route: ActivatedRoute, public router: Router,
        public formBuilder: FormBuilder) {
        this.people = [
                    //    { id: "/horoscope", name: "HoroScope" }, 
                    //    { id: "/matchmaking", name: "Match Making" },
                    //    { id: "/astamangala", name: "Astamangala" },
                       { id:"/#SH", name:"HoroScope" },
                       { id: "/#SM", name: "Match Making" },
                       //{ id: "/#SA", name: "Astamangala" },
                      ];
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                if (this.router.url === '/services' && this.people && this.people.length > 0) {
                    // this code only runs when the user is on this page and uses the menu
                    // to navigate to the people app.
                    this.onPersonSelected(this.people[0].id);
                }
            }
        });
    }

    onPersonSelected(payload: string) {
        this.router.navigate(['services'+payload]);
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

