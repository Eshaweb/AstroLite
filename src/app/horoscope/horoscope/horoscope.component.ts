import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { MapsAPILoader } from '../../../../node_modules/@agm/core';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { PartyService } from '../../../Services/PartyService/PartyService';
import { HoroScopeService, PaymentInfo, ServiceInfo } from '../../../Services/HoroScopeService/HoroScopeService';
import { UIService } from '../../../Services/UIService/ui.service';
import { SmartHttpClient } from '../../../Services/shared/http-client/smart-httpclient.service';
import { HoroRequest } from '../../../Models/HoroScope/HoroRequest';
import { SelectBoxModel } from '../../../Models/SelectBoxModel';


@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.scss']
})
export class HoroscopeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

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
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });
  }
  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

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

  horoscopeForm: FormGroup;
  latitude: number;
  longitude: number;
  timeZoneName: any;
  timeZoneId: any;
  lanuages = [{ "Id": "E", "Text": "English" },
  { "Id": "H", "Text": "Hindi" },
  { "Id": "K", "Text": "Kannada" },
  { "Id": "M", "Text": "Malayalam" }];

  checkBoxValue: boolean = false;
  long: number;
  lat: number;
  horoRequest: HoroRequest;
  LatDegMessage: string;
  LatMtMessage: string;
  timeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Summer Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  //genders:SelectBoxModel[];
  genders: string[];
  payusing: PaymentInfo[];
  using: string[];
  paymentForm: FormGroup;
  usi: any;
  Shloka1: string;
  JanmaNakshatra: any;
  Shloka2: string;
  BDate: any;
  serviceInfo: ServiceInfo[];
  //now: DateTime = new DateTime(2012, 9, 16, 0, 0,0);
  // customValue:Date=new Date();
  opened(e) {
    e.component
      .content()
      .getElementsByClassName("dx-box-item")[0].style.display =
      "none";
    // e.component.content().getElementsByClassName("dx-toolbar-button")[0].style.padding =
    // "25px";
    e.component.content().style.width = "320px";
  }

  constructor(private toastrService: ToastrService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, private partyService: PartyService, public horoScopeService: HoroScopeService, public uiService: UIService,
    public smartHttpClient: SmartHttpClient, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {

    var genders = [{ Id: "M", Text: "Male" },
    { Id: "F", Text: "Female" }];
    //this.serviceInfo =  horoScopeService.getCustomers();
    this.payusing = horoScopeService.getInfo();
    // this.genders=[{Id:"M",Text:"Male"},
    //   {Id:"F",Text:"Female"}];
    // this.genders=[{"Id":"M","Text":"Male"},
    //   {"Id":"F","Text":"Female"}];
    this.genders = ["Male", "Female"];
    this.using = ["AstroLite Wallet", "Payment Gateway"];
    this.horoscopeForm = this.formbuilder.group({
      name: ['Shamanth', [Validators.required, Validators.minLength(4)]],
      fathername: ['Rajesh', [Validators.required, Validators.minLength(4)]],
      mothername: ['Leelavathi', [Validators.required, Validators.minLength(4)]],
      gothra: ['Vasista', [Validators.required, Validators.minLength(4)]],
      Bdate: ['', [Validators.required]],
      Btime: ['', [Validators.required]],
      timeformat: ['', [Validators.required]],
      bplace: ['', [Validators.required]],
      language: ['', [Validators.required]],
      latitude: [''],
      longitude: [''],
      gender: ['', [Validators.required]],
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
    const nameContrl = this.horoscopeForm.get('name');
    nameContrl.valueChanges.subscribe(value => this.setErrorMessage(nameContrl));
    const fathernameContrl = this.horoscopeForm.get('fathername');
    fathernameContrl.valueChanges.subscribe(value => this.setErrorMessage(fathernameContrl));
    const mothernameContrl = this.horoscopeForm.get('mothername');
    mothernameContrl.valueChanges.subscribe(value => this.setErrorMessage(mothernameContrl));
    const gothraContrl = this.horoscopeForm.get('gothra');
    gothraContrl.valueChanges.subscribe(value => this.setErrorMessage(gothraContrl));
    const LatDegContrl = this.horoscopeForm.get('LatDeg');
    LatDegContrl.valueChanges.subscribe(value => this.setErrorMessage(LatDegContrl));
    const LatMtContrl = this.horoscopeForm.get('LatMt');
    LatMtContrl.valueChanges.subscribe(value => this.setErrorMessage(LatMtContrl));
    const BdateContrl = this.horoscopeForm.get('Bdate');
    BdateContrl.valueChanges.subscribe(value => this.setErrorMessage(BdateContrl));
    const BtimeContrl = this.horoscopeForm.get('Btime');
    BtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(BtimeContrl));
    const bplaceContrl = this.horoscopeForm.get('bplace');
    bplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(bplaceContrl));
    const languageContrl = this.horoscopeForm.get('language');
    languageContrl.valueChanges.subscribe(value => this.setErrorMessage(languageContrl));

    this.horoRequest = {
      Name: this.horoscopeForm.controls['name'].value,
      Father: null,
      Mother: null,
      Gothra: null,
      Date: null,
      Time: null,
      TimeFormat: null,
      LatDeg: this.horoscopeForm.controls['LatDeg'].value,
      LatMt: this.horoscopeForm.controls['LatMt'].value,
      LongDeg: this.horoscopeForm.controls['LongDeg'].value,
      LongMt: this.horoscopeForm.controls['LongMt'].value,
      NS: this.horoscopeForm.controls['NS'].value,
      EW: this.horoscopeForm.controls['EW'].value,
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

    this.paymentForm = this.formbuilder.group({
      using: ['']
    });

  }

  // onValueChanged(event) {
  //   this.usi = this.paymentForm.controls['using'].value;
  // }
  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = { //used in above method.
    name_required: '*Enter Name',
    name_minlength: '*Minimum length is 4',

    fathername_required: '*Enter Father Name',
    fathername_minlength: '*Minimum length is 4',

    mothername_required: '*Enter Mother Name',
    mothername_minlength: '*Minimum length is 4',

    gothra_required: '*Enter Gothra',
    gothra_minlength: '*Minimum length is 4',

    LatDeg_required: '*Enter Latitude Degree',
    LatDeg_min: '*Minimum value is 0',
    LatDeg_max: '*Maximum value is 90',

    LatMt_required: '*Enter Latitude Minute',
    LatMt_min: '*Minimum value is 0',
    LatMt_max: '*Maximum value is 59',

    Bdate_required: '*Select Date of Birth',

    bplace_required: '*Enter Birth Place',

    language_required: '*Select Language',

  };
  // getTimezone(lat, long) {

  //   this.horoRequest.LatDeg = parseInt(lat);
  //   this.horoRequest.LongDeg = parseInt(long);
  //   this.horoRequest.LatMt = parseInt(Math.abs((lat - this.horoRequest.LatDeg) * 60).toString());
  //   this.horoRequest.LongMt = parseInt(Math.abs((long - this.horoRequest.LongDeg) * 60).toString());
  //   if (lat < 0) {
  //     this.horoRequest.NS = "S";
  //   }
  //   else {
  //     this.horoRequest.NS = "N";
  //   }
  //   if (long < 0) {
  //     this.horoRequest.EW = "W";
  //   }
  //   else {
  //     this.horoRequest.EW = "W";
  //   }
  //   this.horoScopeService.getTimezone(lat, long).subscribe((data: any) => {
  //     this.horoRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
  //     this.horoRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.horoRequest.ZH) * 60).toString());
  //     if (data.rawOffset < 0) {
  //       this.horoRequest.PN = "-";
  //     }
  //     else {
  //       this.horoRequest.PN = "+";
  //     }
  //     this.timeZoneName = data.timeZoneName;
  //     this.timeZoneId = data.timeZoneId;
  //     this.cdr.detectChanges();
  //   });
  // }

  OnMouseUp(event) {
    if (event == null) {
      this.timeZoneName = null;
    }
  }

  onClick() {
    // let loading = this.loadingController.create({
    //   content: 'Loading the Free HoroScope..'
    // });
    // loading.present();
    this.horoRequest = {
      Name: this.horoscopeForm.controls['name'].value,
      Father: this.horoscopeForm.controls['fathername'].value,
      Mother: this.horoscopeForm.controls['mothername'].value,
      Gothra: this.horoscopeForm.controls['gothra'].value,
      Date: this.horoscopeForm.controls['Bdate'].value,
      Time: this.horoscopeForm.controls['Btime'].value,
      //DOB:this.horoscopeForm.controls['Bdate'].value.toISOString(),
      TimeFormat: this.horoscopeForm.controls['timeformat'].value,
      LatDeg: this.horoscopeForm.controls['LatDeg'].value,
      LatMt: this.horoscopeForm.controls['LatMt'].value,
      LongDeg: this.horoscopeForm.controls['LongDeg'].value,
      LongMt: this.horoscopeForm.controls['LongMt'].value,
      NS: this.horoscopeForm.controls['NS'].value,
      EW: this.horoscopeForm.controls['EW'].value,
      ZH: this.horoscopeForm.controls['ZH'].value,
      ZM: this.horoscopeForm.controls['ZM'].value,
      PN: this.horoscopeForm.controls['PN'].value,
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
    var horoRequest = this.horoRequest;
    this.BDate = this.horoscopeForm.controls['Bdate'].value;
    this.horoScopeService.GetFreeData(this.horoRequest, (data) => {
      //loading.dismiss();
      // this.navCtrl.push(Horoscope2Page, { horoRequest, data, "BirthPlace": this.horoscopeForm.controls['bplace'].value, 'Fathername': this.horoscopeForm.controls['fathername'].value, 'Mothername': this.horoscopeForm.controls['mothername'].value })
      // this.router.navigate(['xxxxxxx']);
      this.router.navigate(["/horoscope2", { horoRequest, data, "BirthPlace": this.horoscopeForm.controls['bplace'].value, 'Fathername': this.horoscopeForm.controls['fathername'].value, 'Mothername': this.horoscopeForm.controls['mothername'].value }]);

    });
  }



}

