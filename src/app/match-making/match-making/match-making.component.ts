import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { MatchMakingService } from '../../../Services/MatchMakingService/MatchMakingService';
import { MapsAPILoader } from '../../../../node_modules/@agm/core';
import { UIService } from '../../../Services/UIService/ui.service';
import { SmartHttpClient } from '../../../Services/shared/http-client/smart-httpclient.service';
import { SelectBoxModel } from '../../../Models/SelectBoxModel';
import { MaleMatchMakingRequest } from '../../../Models/MatchMaking/MaleMatchMakingRequest';
import { FemaleMatchMakingRequest } from '../../../Models/MatchMaking/FemaleMatchMakingRequest';


@Component({
    selector: 'app-match-making',
    templateUrl: './match-making.component.html',
    styleUrls: ['./match-making.component.scss']
})
export class MatchMakingComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
        
    }

    maleMatchMakingForm: FormGroup;
    femaleMatchMakingForm: FormGroup;
    longitude: number;
    latitude: number;
    maleMatchMakingRequest: MaleMatchMakingRequest;
    femaleMatchMakingRequest: FemaleMatchMakingRequest;
    // timeZoneName: any;
    // timeZoneId: any;
    timeZoneId_Male: any;
    timeZoneName_Male: any;
    timeZoneId_Female: any;
    timeZoneName_Female: any;
    checkBoxValue_Male: boolean = false;
    checkBoxValue_Female: boolean = false;
    LatDegMessage: string;
    LatMtMessage: string;
    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            let nativeHome1InputBox = document.getElementById('txtHome1').getElementsByTagName('input')[0];
            let autocomplete1 = new google.maps.places.Autocomplete(nativeHome1InputBox, {
                types: ["address"]
            });
            console.log(autocomplete1);
            autocomplete1.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete1.getPlace();
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.getTimezone_Male(this.latitude, this.longitude);
                });
            });
            let nativeHome2InputBox = document.getElementById('txtHome2').getElementsByTagName('input')[0];
            let autocomplete2 = new google.maps.places.Autocomplete(nativeHome2InputBox, {
                types: ["address"]
            });
            console.log(autocomplete2);
            autocomplete2.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete2.getPlace();
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.getTimezone_Female(this.latitude, this.longitude);
                });
            });
        });
    }

    opened(e) {
        e.component
            .content()
            .getElementsByClassName("dx-box-item")[0].style.display =
            "none";
        // e.component.content().getElementsByClassName("dx-toolbar-button")[0].style.padding =
        // "25px";
        e.component.content().style.width = "320px";
    }
    maletimeformats: SelectBoxModel[] = [
        { Id: "STANDARD", Text: 'Standard Time' },
        { Id: "SUMMER", Text: 'Summer Time' },
        { Id: "DOUBLE", Text: 'Double Summer Time' },
        { Id: "WAR", Text: 'War Time' }
    ];
    femaletimeformats: SelectBoxModel[] = [
        { Id: "STANDARD", Text: 'Standard Time' },
        { Id: "SUMMER", Text: 'Summer Time' },
        { Id: "DOUBLE", Text: 'Double Summer Time' },
        { Id: "WAR", Text: 'War Time' }
    ];
    lanuages = [{ "Id": "E", "Text": "English" },
    { "Id": "H", "Text": "Hindi" },
    { "Id": "K", "Text": "Kannada" },
    { "Id": "M", "Text": "Malayalam" }];

    constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef,
        private matchMakingService: MatchMakingService, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader,
        public uiService: UIService, public smartHttpClient: SmartHttpClient, public formbuilder: FormBuilder) {
        this.maleMatchMakingForm = this.formbuilder.group({
            maleName: ['Shamanth', [Validators.required, Validators.minLength(4)]],
            MaleBdate: ['', [Validators.required]],
            MaleBtime: ['', [Validators.required]],
            MaleBplace: ['', [Validators.required]],
            MaleTimeformat: ['', [Validators.required]],
            //language: ['', [Validators.required]],
            latitude: [''],
            longitude: [''],
            LatDeg: ['', [Validators.min(0), Validators.max(90)]],
            LongDeg: ['', [Validators.min(0), Validators.max(180)]],
            LatMt: ['', [Validators.min(0), Validators.max(59)]],
            LongMt: ['', [Validators.min(0), Validators.max(59)]],
            NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
            EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
            ZH: [null, [Validators.min(0), Validators.max(13)]],
            ZM: [null, [Validators.min(0), Validators.max(45)]],
            PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        });
        const maleNameContrl = this.maleMatchMakingForm.get('maleName');
        maleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(maleNameContrl));
        const MaleBdateContrl = this.maleMatchMakingForm.get('MaleBdate');
        MaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBdateContrl));
        const MaleBtimeContrl = this.maleMatchMakingForm.get('MaleBtime');
        MaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBtimeContrl));
        const MaleBplaceContrl = this.maleMatchMakingForm.get('MaleBplace');
        MaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBplaceContrl));
        this.maleMatchMakingRequest = {
            Name: this.maleMatchMakingForm.controls['maleName'].value,
            Father: null,
            Mother: null,
            Gothra: null,
            Date: null,
            Time: null,
            TimeFormat: null,
            LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
            LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
            LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
            LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
            NS: this.maleMatchMakingForm.controls['NS'].value,
            EW: this.maleMatchMakingForm.controls['EW'].value,
            ZH: null,
            ZM: null,
            PN: null,
            Gender: null,
            // ReportType:null,
            // FormParameter:null,
            // Swarna:null,
            // Pruchaka:null,
            // JanmaRashi:null,
            // AshtaManagalaNo:null,
            // IsMarried:null,
            // Path:null
        }
        this.femaleMatchMakingForm = this.formbuilder.group({
            femaleName: ['Shamanth', [Validators.required, Validators.minLength(4)]],
            FemaleBdate: ['', [Validators.required]],
            FemaleBtime: ['', [Validators.required]],
            FemaleBplace: ['', [Validators.required]],
            FemaleTimeformat: ['', [Validators.required]],
            //language: ['', [Validators.required]],
            latitude: [''],
            longitude: [''],
            LatDeg: ['', [Validators.min(0), Validators.max(90)]],
            LongDeg: ['', [Validators.min(0), Validators.max(180)]],
            LatMt: ['', [Validators.min(0), Validators.max(59)]],
            LongMt: ['', [Validators.min(0), Validators.max(59)]],
            NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
            EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
            ZH: [null, [Validators.min(0), Validators.max(13)]],
            ZM: [null, [Validators.min(0), Validators.max(45)]],
            PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        });
        const femaleNameContrl = this.femaleMatchMakingForm.get('femaleName');
        femaleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(femaleNameContrl));
        const FemaleBdateContrl = this.femaleMatchMakingForm.get('FemaleBdate');
        FemaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBdateContrl));
        const FemaleBtimeContrl = this.femaleMatchMakingForm.get('FemaleBtime');
        FemaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBtimeContrl));
        const FemaleBplaceContrl = this.femaleMatchMakingForm.get('FemaleBplace');
        FemaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBplaceContrl));
        this.femaleMatchMakingRequest = {
            Name: this.femaleMatchMakingForm.controls['femaleName'].value,
            Father: null,
            Mother: null,
            Gothra: null,
            Date: null,
            Time: null,
            TimeFormat: null,
            LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
            LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
            LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
            LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
            NS: this.femaleMatchMakingForm.controls['NS'].value,
            EW: this.femaleMatchMakingForm.controls['EW'].value,
            ZH: null,
            ZM: null,
            PN: null,
            Gender: null,
            // ReportType:null,
            // FormParameter:null,
            // Swarna:null,
            // Pruchaka:null,
            // JanmaRashi:null,
            // AshtaManagalaNo:null,
            // IsMarried:null,
            // Path:null
        }
    }
    setErrorMessage(c: AbstractControl): void {
        let control = this.uiService.getControlName(c);//gives the control name property from particular service.
        document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
        if ((c.touched || c.dirty) && c.errors) {
            document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
            //maps the error message from validationMessages array. 
        }
    }
    private validationMessages = { //used in above method.
        maleName_required: '*Enter Name',
        maleName_minlength: '*Minimum length is 4',

        femaleName_required: '*Enter Father Name',
        femaleName_minlength: '*Minimum length is 4',

        MaleBdate_required: '*Select Birth Date of Male',

        FemaleBdate_required: '*Select Birth Date of Female',

        MaleBtime_required: '*Select Birth Time',

        FemaleBtime_required: '*Select Birth Time',

        MaleBplace_required: '*Enter Birth Place',

        FemaleBplace_required: '*Enter Birth Place'

    };
    getTimezone_Male(lat, long) {
        this.maleMatchMakingRequest.LatDeg = parseInt(lat);
        this.maleMatchMakingRequest.LongDeg = parseInt(long);
        this.maleMatchMakingRequest.LatMt = parseInt(Math.abs((lat - this.maleMatchMakingRequest.LatDeg) * 60).toString());
        this.maleMatchMakingRequest.LongMt = parseInt(Math.abs((long - this.maleMatchMakingRequest.LongDeg) * 60).toString());
        if (lat < 0) {
            this.maleMatchMakingRequest.NS = "S";
        }
        else {
            this.maleMatchMakingRequest.NS = "N";
        }
        if (long < 0) {
            this.maleMatchMakingRequest.EW = "W";
        }
        else {
            this.maleMatchMakingRequest.EW = "W";
        }
        this.matchMakingService.getTimezone(lat, long).subscribe((data: any) => setTimeout(() => {
            this.maleMatchMakingRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
            this.maleMatchMakingRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.maleMatchMakingRequest.ZH) * 60).toString());
            if (data.rawOffset < 0) {
                this.maleMatchMakingRequest.PN = "-";
            }
            else {
                this.maleMatchMakingRequest.PN = "+";
            }
            this.timeZoneName_Male = data.timeZoneName;
            this.timeZoneId_Male = data.timeZoneId;
            this.cdr.detectChanges();
        }));
    }
    getTimezone_Female(lat, long) {
        this.femaleMatchMakingRequest.LatDeg = parseInt(lat);
        this.femaleMatchMakingRequest.LongDeg = parseInt(long);
        this.femaleMatchMakingRequest.LatMt = parseInt(Math.abs((lat - this.femaleMatchMakingRequest.LatDeg) * 60).toString());
        this.femaleMatchMakingRequest.LongMt = parseInt(Math.abs((long - this.femaleMatchMakingRequest.LongDeg) * 60).toString());
        if (lat < 0) {
            this.femaleMatchMakingRequest.NS = "S";
        }
        else {
            this.femaleMatchMakingRequest.NS = "N";
        }
        if (long < 0) {
            this.femaleMatchMakingRequest.EW = "W";
        }
        else {
            this.femaleMatchMakingRequest.EW = "W";
        }
        this.matchMakingService.getTimezone(lat, long).subscribe((data: any) => setTimeout(() => {
            this.femaleMatchMakingRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
            this.femaleMatchMakingRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.femaleMatchMakingRequest.ZH) * 60).toString());
            if (data.rawOffset < 0) {
                this.femaleMatchMakingRequest.PN = "-";
            }
            else {
                this.femaleMatchMakingRequest.PN = "+";
            }
            this.timeZoneName_Female = data.timeZoneName;
            this.timeZoneId_Female = data.timeZoneId;
            this.cdr.detectChanges();
        }));
    }
    OnMouseUp_Male(event) {
        if (event == null) {
            this.timeZoneName_Male = null;
        }
    }
    OnMouseUp_Female(event) {
        if (event == null) {
            this.timeZoneName_Female = null;
        }
    }

    onClick() {
        // let loading = this.loadingController.create({
        //   content: 'Loading the Free HoroScope..'
        // });
        // loading.present();
        this.maleMatchMakingRequest = {
            Name: this.maleMatchMakingForm.controls['maleName'].value,
            Father: this.maleMatchMakingForm.controls['fathername'].value,
            Mother: this.maleMatchMakingForm.controls['mothername'].value,
            Gothra: this.maleMatchMakingForm.controls['gothra'].value,
            Date: this.maleMatchMakingForm.controls['MaleBdate'].value,
            Time: this.maleMatchMakingForm.controls['MaleBtime'].value,
            //DOB:this.horoscopeForm.controls['Bdate'].value.toISOString(),
            TimeFormat: this.maleMatchMakingForm.controls['timeformat'].value,
            LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
            LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
            LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
            LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
            NS: this.maleMatchMakingForm.controls['NS'].value,
            EW: this.maleMatchMakingForm.controls['EW'].value,
            ZH: this.maleMatchMakingForm.controls['ZH'].value,
            ZM: this.maleMatchMakingForm.controls['ZM'].value,
            PN: this.maleMatchMakingForm.controls['PN'].value,
            Gender: "M",
            // ReportType:null,
            // FormParameter:null,
            // Swarna:null,
            // Pruchaka:null,
            // JanmaRashi:null,
            // AshtaManagalaNo:null,
            // IsMarried:null,
            // Path:null
        }
        this.femaleMatchMakingRequest = {
            Name: this.femaleMatchMakingForm.controls['femaleName'].value,
            Father: this.femaleMatchMakingForm.controls['fathername'].value,
            Mother: this.femaleMatchMakingForm.controls['mothername'].value,
            Gothra: this.femaleMatchMakingForm.controls['gothra'].value,
            Date: this.femaleMatchMakingForm.controls['FemaleBdate'].value,
            Time: this.femaleMatchMakingForm.controls['FemaleBtime'].value,
            //DOB:this.horoscopeForm.controls['Bdate'].value.toISOString(),
            TimeFormat: this.femaleMatchMakingForm.controls['timeformat'].value,
            LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
            LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
            LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
            LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
            NS: this.femaleMatchMakingForm.controls['NS'].value,
            EW: this.femaleMatchMakingForm.controls['EW'].value,
            ZH: this.femaleMatchMakingForm.controls['ZH'].value,
            ZM: this.femaleMatchMakingForm.controls['ZM'].value,
            PN: this.femaleMatchMakingForm.controls['PN'].value,
            Gender: "F",
            // ReportType:null,
            // FormParameter:null,
            // Swarna:null,
            // Pruchaka:null,
            // JanmaRashi:null,
            // AshtaManagalaNo:null,
            // IsMarried:null,
            // Path:null
        }
        var maleMatchMakingRequest = this.maleMatchMakingRequest;
        // this.BDate = this.maleMatchMakingForm.controls['Bdate'].value;
        // this.matchMakingService.GetFreeData(this.maleMatchMakingRequest, (data) => {
        //   loading.dismiss();
        //   this.navCtrl.push(MatchResultPage, { maleMatchMakingRequest, data, "BirthPlace": this.horoscopeForm.controls['bplace'].value, 'Fathername': this.horoscopeForm.controls['fathername'].value, 'Mothername': this.horoscopeForm.controls['mothername'].value })
        // });
    }
}
