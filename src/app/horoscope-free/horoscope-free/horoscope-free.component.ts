import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { ServiceInfo, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { Platform } from '@angular/cdk/platform';
import { LoginService } from 'src/Services/login/login.service';
import { Location } from "@angular/common";


@Component({
    selector: 'app-horoscope-free',
    templateUrl: './horoscope-free.component.html',
    styleUrls: ['./horoscope-free.component.scss']
})
export class HoroscopeFreeComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    Shloka1: string;
    Shloka2: string;
    Name: string;
    Fathername: string;
    Mothername: string;
    ItMastId: any;
    serviceInfo: ServiceInfo[];
    horoRequest: HoroRequest;
    horoInfo: any;
    JanmaNakshathra: string;
    JanmaRashi: string;
    BirthPlace: string;
    SunRise: string;
    SunSet: string;
    DinaMana: string;
    ShakaVarsha: string;
    Kollam: string;
    Samvathsara: string;
    Aayana: string;
    ChandraMasa: string;
    Ruthu: string;
    SouraMasa: string;
    Paksha: string;
    MahaNakshatra: string;
    Tithi: string;
    NithyaNakshatra: string;
    ChandrarkaYoga: string;
    Karana: string;
    VishaGhati: string;
    AmrithaGhati: string;
    BDate: string;
    ngOnInit(): void {
        // $("#flipbook").turn({
        //     width: '100%',
        //     height: 170,
        //     display: 'single',
        //     autoCenter: true
        //   });
    }
    constructor(public _location: Location, public route: ActivatedRoute, public router: Router, public platform: Platform, public loginService: LoginService, public horoScopeService: HoroScopeService) {
        //this.navparams = this.navParams.data.data;
        //this.horoInfo = this.navParams.data.horoRequest;
        // this.Name = this.route.snapshot.params['name'];
        // this.horoInfo = this.route.snapshot.data['horoRequest'];
        //this.horoInfo = this.route.snapshot.data[JSON.parse("horoRequest")];
        //this.horoInfo = this.route.snapshot.params[JSON.parse("horoRequest")];
        // var cccc=this.route.queryParams;


        // this.route.queryParams.subscribe(params => {
        //     this.Fathername = params['Fathername'];
        //     this.Mothername = params['Mothername'];
        // });

        
        // this.Fathername = this.route.snapshot.params['Fathername'];
        // this.Mothername = this.route.snapshot.params['Mothername'];
        // this.BirthPlace = this.route.snapshot.params['BirthPlace'];

        this.Fathername = this.horoScopeService.Mothername;
        this.Mothername = this.horoScopeService.Fathername;
        this.BirthPlace = this.horoScopeService.birthplaceShort;
        // this.route.snapshot.data.subscribe(result=>{
        //     this.horoInfo = result['horoRequest'];
        //     this.horoInfo = result['data'];
        // });
        // this.route.params.subscribe(params => {
        //     //this.id = +params['OrderId']; // (+) converts string 'id' to a number
        //     this.Fathername = params['Fathername'];
        //     this.Mothername = params['Mothername'];
        //     this.BirthPlace = params['BirthPlace'];
        //     // In a real app: dispatch action to load the details here.
        // });

        this.horoInfo = horoScopeService.horoRequest;
        this.Name = horoScopeService.horoRequest.Name;
        this.BDate = horoScopeService.horoRequest.Date
        this.Shloka1 = horoScopeService.data.Shloka1;
        this.Shloka2 = horoScopeService.data.Shloka2;
        this.JanmaNakshathra = horoScopeService.data.JanmaNakshathra;
        this.JanmaRashi = horoScopeService.data.JanmaRashi;
        this.SunRise = horoScopeService.data.SunRise;
        this.SunSet = horoScopeService.data.SunSet;
        this.DinaMana = horoScopeService.data.DinaMana;
        this.ShakaVarsha = horoScopeService.data.ShakaVarsha;
        this.Kollam = horoScopeService.data.Kollam;
        this.Samvathsara = horoScopeService.data.Samvathsara;
        this.Aayana = horoScopeService.data.Aayana;
        this.Ruthu = horoScopeService.data.Ruthu;
        this.ChandraMasa = horoScopeService.data.ChandraMasa;
        this.SouraMasa = horoScopeService.data.SouraMasa;
        this.Paksha = horoScopeService.data.Paksha;
        this.MahaNakshatra = horoScopeService.data.MahaNakshatra;
        this.Tithi = horoScopeService.data.Tithi;
        this.NithyaNakshatra = horoScopeService.data.NithyaNakshatra;
        this.ChandrarkaYoga = horoScopeService.data.ChandrarkaYoga;
        this.Karana = horoScopeService.data.Karana;
        this.VishaGhati = horoScopeService.data.VishaGhati;
        this.AmrithaGhati = horoScopeService.data.AmrithaGhati;
        
    }
    backClicked() {
        this._location.back();
    }

    onClick() {
        if (this.loginService.Token == null) {
            //this.events.publish('Login',orderModel,itemOrdered);
            //   const myModalOptions: ModalOptions = {
            //     enableBackdropDismiss: false,
            //     cssClass : 'mymodal'
            //   };
            //   let profileModal = this.modalCtrl.create(LoginPage, { 'HoroInfo': this.horoInfo }, myModalOptions);
            //   profileModal.present();
            this.router.navigate(["/services/login"]);
        }
        else {
            this.router.navigate(["/services/horoscopePaid", { "PartyMastId": this.loginService.PartyMastId}]);
        }
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {

    }

}

