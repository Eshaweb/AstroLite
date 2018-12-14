import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
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
import { isNumeric } from 'rxjs/util/isNumeric';
import { Gender } from 'src/Enums/gender';

@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.scss']
})
export class HoroscopeComponent implements OnInit, OnDestroy, AfterViewInit {
  //public date: Date;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  birthplace: string;
  dateModel: string;
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
          this.birthplace=place.formatted_address;
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
    this.horoRequest.LatDeg = parseInt(lat);
    this.horoRequest.LongDeg = parseInt(long);
    this.horoRequest.LatMt = parseInt(Math.abs((lat - this.horoRequest.LatDeg) * 60).toString());
    this.horoRequest.LongMt = parseInt(Math.abs((long - this.horoRequest.LongDeg) * 60).toString());
    if (lat < 0) {
      this.horoRequest.NS = "S";
    }
    else {
      this.horoRequest.NS = "N";
    }
    if (long < 0) {
      this.horoRequest.EW = "W";
    }
    else {
      this.horoRequest.EW = "W";
    }
    this.horoScopeService.getTimezone(lat, long).subscribe((data: any) => {
      this.horoRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.horoRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.horoRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.horoRequest.PN = "-";
      }
      else {
        this.horoRequest.PN = "+";
      }
      this.timeZoneName = data.timeZoneName;
      this.timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }

  horoscopeFormForm: FormGroup;
  latitude: number;
  longitude: number;
  timeZoneName: any;
  timeZoneId: any;
  lanuages = [{ "Id": "E", "Text": "English" },
  { "Id": "H", "Text": "Hindi" },
  { "Id": "K", "Text": "Kannada" },
  { "Id": "M", "Text": "Malayalam" }];

  public checkBoxValue: boolean = false;
  public enabletoEdit: boolean = false;
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
  genders:string[];
  //genders: SelectBoxModel[];
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
  public enumToKeyValues(definition: Object): string[] {

    return Object.keys(definition).filter((value, index) => {
        return isNumeric(value);
    });
}
  constructor(private toastrService: ToastrService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, private partyService: PartyService, public horoScopeService: HoroScopeService, public uiService: UIService,
    public smartHttpClient: SmartHttpClient, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {

    var genders = [{ Id: "M", Text: "Male" },
    { Id: "F", Text: "Female" }];
    //this.serviceInfo =  horoScopeService.getCustomers();
    this.payusing = horoScopeService.getInfo();
    this.genders=this.enumToKeyValues(Gender);
    // this.genders=[{Id:"M",Text:"Male"},
    //   {Id:"F",Text:"Female"}];
    // this.genders=[{"Id":"M","Text":"Male"},
    //   {"Id":"F","Text":"Female"}];
    //this.genders = ["Male", "Female"];
    this.using = ["AstroLite Wallet", "Payment Gateway"];
    //this.horoRequest=this.horoScopeService.horoRequest;
    this.horoscopeFormForm = this.formbuilder.group({
      name: ['Shamanth', [Validators.required, Validators.minLength(4)]],
      fatherName: ['Rajesh', [Validators.required, Validators.minLength(4)]],
      motherName: ['Leelavathi', [Validators.required, Validators.minLength(4)]],
      gotra: ['Vasista', [Validators.required, Validators.minLength(4)]],
      birthDate: [null, [Validators.required]],
      birthTime: ['', [Validators.required]],
      timeformat: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      //language: ['', [Validators.required]],
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
    const nameContrl = this.horoscopeFormForm.get('name');
    nameContrl.valueChanges.subscribe(value => this.setErrorMessage(nameContrl));
    const fatherNameContrl = this.horoscopeFormForm.get('fatherName');
    fatherNameContrl.valueChanges.subscribe(value => this.setErrorMessage(fatherNameContrl));
    const motherNameContrl = this.horoscopeFormForm.get('motherName');
    motherNameContrl.valueChanges.subscribe(value => this.setErrorMessage(motherNameContrl));
    const gotraContrl = this.horoscopeFormForm.get('gotra');
    gotraContrl.valueChanges.subscribe(value => this.setErrorMessage(gotraContrl));
    const genderContrl = this.horoscopeFormForm.get('gender');
    genderContrl.valueChanges.subscribe(value => this.setErrorMessage(genderContrl));
    const LatDegContrl = this.horoscopeFormForm.get('LatDeg');
    LatDegContrl.valueChanges.subscribe(value => this.setErrorMessage(LatDegContrl));
    const LatMtContrl = this.horoscopeFormForm.get('LatMt');
    LatMtContrl.valueChanges.subscribe(value => this.setErrorMessage(LatMtContrl));
    const birthDateContrl = this.horoscopeFormForm.get('birthDate');
    birthDateContrl.valueChanges.subscribe(value => this.setErrorMessage(birthDateContrl));
    const birthTimeContrl = this.horoscopeFormForm.get('birthTime');
    birthTimeContrl.valueChanges.subscribe(value => this.setErrorMessage(birthTimeContrl));
    const birthPlaceContrl = this.horoscopeFormForm.get('birthPlace');
    birthPlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(birthPlaceContrl));
    // const languageContrl = this.horoscopeForm.get('language');
    // languageContrl.valueChanges.subscribe(value => this.setErrorMessage(languageContrl));

    this.horoRequest = {
      Name: this.horoscopeFormForm.controls['name'].value,
      Father: null,
      Mother: null,
      Gothra: null,
      Date: null,
      Time: null,
      TimeFormat: null,
      LatDeg: this.horoscopeFormForm.controls['LatDeg'].value,
      LatMt: this.horoscopeFormForm.controls['LatMt'].value,
      LongDeg: this.horoscopeFormForm.controls['LongDeg'].value,
      LongMt: this.horoscopeFormForm.controls['LongMt'].value,
      NS: this.horoscopeFormForm.controls['NS'].value,
      EW: this.horoscopeFormForm.controls['EW'].value,
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

    fatherName_required: '*Enter Father Name',
    fatherName_minlength: '*Minimum length is 4',

    motherName_required: '*Enter Mother Name',
    motherName_minlength: '*Minimum length is 4',

    gotra_required: '*Enter Gothra',
    gotra_minlength: '*Minimum length is 4',

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
 
  OnMouseUp(event) {
    if (event == null) {
      this.timeZoneName = null;
    }
  }
  checkBoxStateChanged(){
    if(this.checkBoxValue==true){
       this.enabletoEdit=true;
       this.checkBoxValue=false;
    }
    else{
      this.enabletoEdit=false;
      this.checkBoxValue=true;
    }
  }
  
  onSelection(event){
    console.log("hello");
  }
  public date: Date = new Date(Date.now());
  private monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
  public formatter = (date: Date) => {
    return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  onClick() {
    var bdate:Date=this.horoscopeFormForm.controls['Bdate'].value;
    var btime:Date=this.horoscopeFormForm.controls['Btime'].value;
    var dateinString=bdate.getFullYear().toString()+"-"+("0"+((bdate.getMonth())+1)).toString().slice(-2)+"-"+("0"+bdate.getDate()).toString().slice(-2);
    var timeinString=("0"+btime.getHours()).toString().slice(-2)+":"+("0"+btime.getMinutes()).toString().slice(-2)+":"+btime.getSeconds().toString()+"0";
    this.horoRequest = {
      Name: this.horoscopeFormForm.controls['name'].value,
      Father: this.horoscopeFormForm.controls['fathername'].value,
      Mother: this.horoscopeFormForm.controls['mothername'].value,
      Gothra: 'Vasista',
      //Date: "2018-12-28",
      //Time: "18:34:00",
      Date:dateinString,
      Time:timeinString,
      //DOB:this.horoscopeForm.controls['Bdate'].value.toISOString(),
      TimeFormat: this.horoscopeFormForm.controls['timeformat'].value[0].Id,
      LatDeg: this.horoscopeFormForm.controls['LatDeg'].value,
      LatMt: this.horoscopeFormForm.controls['LatMt'].value,
      LongDeg: this.horoscopeFormForm.controls['LongDeg'].value,
      LongMt: this.horoscopeFormForm.controls['LongMt'].value,
      NS: this.horoscopeFormForm.controls['NS'].value,
      EW: this.horoscopeFormForm.controls['EW'].value,
      ZH: this.horoscopeFormForm.controls['ZH'].value,
      ZM: this.horoscopeFormForm.controls['ZM'].value,
      PN: this.horoscopeFormForm.controls['PN'].value,
      Gender: this.horoscopeFormForm.controls['gender'].value,
      // ReportType:null,
      // FormParameter:null,
      // Swarna:null,
      // Pruchaka:null,
      // JanmaRashi:null,
      // AshtaManagalaNo:null,
      // IsMarried:null,
      // Path:null
    }

    // var dateindate = new  Date (dateinString);
    // this.dateModel=dateindate.toDateString ();


    var horoRequest = this.horoRequest;
    //this.BDate = this.horoscopeForm.controls['Bdate'].value;
    this.horoScopeService.GetFreeData(this.horoRequest, (data) => {
      let navigationExtras: NavigationExtras = {
        // queryParams: {
        //   "BirthPlace": this.horoscopeForm.controls['bplace'].value, 
        //   'Fathername': this.horoscopeForm.controls['fathername'].value, 
        //   'Mothername': this.horoscopeForm.controls['mothername'].value
        // }
        queryParams: horoRequest,
        // queryParams:{horoRequest:JSON.stringify(horoRequest),"data":data}
      };
      //this.router.navigate(["/horoscopeFree",  {"horoRequest":horoRequest,queryParams:horoRequest, "data":data, navigationExtras,"BirthPlace": this.horoscopeForm.controls['bplace'].value, 'Fathername': this.horoscopeForm.controls['fathername'].value, 'Mothername': this.horoscopeForm.controls['mothername'].value }]);
      this.horoScopeService.horoRequest = this.horoRequest;
      this.horoScopeService.data = data;
      this.router.navigate(["/horoscopeFree", { "BirthPlace": this.birthplace, 'Fathername': this.horoscopeFormForm.controls['fathername'].value, 'Mothername': this.horoscopeFormForm.controls['mothername'].value }]);
    });
  }

}

