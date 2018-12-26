import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { MapsAPILoader } from '@agm/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { UIService } from 'src/Services/UIService/ui.service';


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
    place: string;
    latitude: number;
    longitude: number;
    horoscopeForm: FormGroup;
    horoRequest: HoroRequest;
  paksha: string;


    constructor(private route: ActivatedRoute, private router: Router,public uiService: UIService,
            private formbuilder: FormBuilder, private ngZone: NgZone, 
            private mapsAPILoader: MapsAPILoader,public horoScopeService: HoroScopeService) {
                this.tithi='Sapthami';
                this.day='Friday';
                this.nakshathra='Hubba';
                this.yoga='Aayushmaan';
                this.karana='Bhadra';

                this.shaaliVahanaShaka='1940';
                this.samvathsara='Vilambi';
                this.ruthu='Hemantha';
                this.sauraMasa='Dhanu';
                this.chaandraMasa='MargaShira';

                this.sunRise='06:40 AM';
                this.sunSet='06:02 PM';
                this.paksha='Krishna';
                this.moonRise='11:45 PM';
                this.moonSet='11:38 AM';

                this.raahuKaala='';
                this.gulikaKaala='';
                this.yamaKantaka='';

                // this.horoscopeForm = this.formbuilder.group({
                //     birthDate: [null, [Validators.required]],
                //     birthTime: ['', [Validators.required]],
                //     //timeformat: ['', [Validators.required]],
                //     birthPlace: ['', [Validators.required]],
                //     //language: ['', [Validators.required]],
                //     latitude: [''],
                //     longitude: [''],
                //     LatDeg: ['', [Validators.min(0), Validators.max(90)]],
                //     LongDeg: ['', [Validators.min(0), Validators.max(180)]],
                //     LatMt: ['', [Validators.min(0), Validators.max(59)]],
                //     LongMt: ['', [Validators.min(0), Validators.max(59)]],
                //     NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
                //     EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
                //     ZH: [null, [Validators.min(0), Validators.max(13)]],
                //     ZM: [null, [Validators.min(0), Validators.max(45)]],
                //     PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
                //   });
                  
                //   const birthDateContrl = this.horoscopeForm.get('birthDate');
                //   birthDateContrl.valueChanges.subscribe(value => this.setErrorMessage(birthDateContrl));
                //   const birthTimeContrl = this.horoscopeForm.get('birthTime');
                //   birthTimeContrl.valueChanges.subscribe(value => this.setErrorMessage(birthTimeContrl));
                //   const birthPlaceContrl = this.horoscopeForm.get('birthPlace');
                //   birthPlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(birthPlaceContrl));
              
                  // this.horoRequest = {
                  //   Name: this.horoscopeForm.controls['name'].value,
                  //   Father: null,
                  //   Mother: null,
                  //   Gothra: null,
                  //   Date: null,
                  //   Time: null,
                  //   TimeFormat: null,
                  //   LatDeg: this.horoscopeForm.controls['LatDeg'].value,
                  //   LatMt: this.horoscopeForm.controls['LatMt'].value,
                  //   LongDeg: this.horoscopeForm.controls['LongDeg'].value,
                  //   LongMt: this.horoscopeForm.controls['LongMt'].value,
                  //   NS: this.horoscopeForm.controls['NS'].value,
                  //   EW: this.horoscopeForm.controls['EW'].value,
                  //   ZH: null,
                  //   ZM: null,
                  //   PN: null,
                  //   Gender: null,
                  //   LangCode: null
                  // }
    }

    setErrorMessage(c: AbstractControl): void {
        let control = this.uiService.getControlName(c);//gives the control name property from particular service.
        document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
        if ((c.touched || c.dirty) && c.errors) {
          document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
        }
      }
      private validationMessages = { //used in above method.
        LatDeg_required: '*Enter Latitude Degree',
        LatDeg_min: '*Minimum value is 0',
        LatDeg_max: '*Maximum value is 90',
    
        LatMt_required: '*Enter Latitude Minute',
        LatMt_min: '*Minimum value is 0',
        LatMt_max: '*Maximum value is 59',
    
        birthDate_required: '*Select Date of Birth',
    
        gender_required: '*Select Date of Birth',
    
        bplace_required: '*Enter Birth Place',
    
        language_required: '*Select Language',
    
      };
    public date: Date = new Date(Date.now());
    private monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
    public formatter = (date: Date) => {
      return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
    }
    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
            let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
              types: ["address"]
            });
            console.log(autocomplete);
            autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                this.place = place.formatted_address;
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.getTimezone(this.latitude, this.longitude);
              });
            });
          });
    }
    getTimezone(lat, long) {
        // this.horoRequest.LatDeg = parseInt(lat);
        // this.horoRequest.LongDeg = parseInt(long);
        // this.horoRequest.LatMt = parseInt(Math.abs((lat - this.horoRequest.LatDeg) * 60).toString());
        // this.horoRequest.LongMt = parseInt(Math.abs((long - this.horoRequest.LongDeg) * 60).toString());
        // if (lat < 0) {
        //   this.horoRequest.NS = "S";
        // }
        // else {
        //   this.horoRequest.NS = "N";
        // }
        // if (long < 0) {
        //   this.horoRequest.EW = "W";
        // }
        // else {
        //   this.horoRequest.EW = "W";
        // }
        // this.horoScopeService.getTimezone(lat, long).subscribe((data: any) => {
        //   this.horoRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
        //   this.horoRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.horoRequest.ZH) * 60).toString());
        //   if (data.rawOffset < 0) {
        //     this.horoRequest.PN = "-";
        //   }
        //   else {
        //     this.horoRequest.PN = "+";
        //   }
        //   this.timeZoneName = data.timeZoneName;
        //   this.timeZoneId = data.timeZoneId;
        //   this.cdr.detectChanges();
        // });
      }
      Submit_Click(){
          
      }
    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    OnHoroScope_Click(){
        this.router.navigate(["/services/#SH"]);
        }

}

