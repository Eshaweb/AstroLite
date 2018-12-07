import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { PartyService } from '../../../Services/PartyService/PartyService';
import { HoroScopeService } from '../../../Services/HoroScopeService/HoroScopeService';
import { UIService } from '../../../Services/UIService/ui.service';
import { SmartHttpClient } from '../../../Services/shared/http-client/smart-httpclient.service';
import { MapsAPILoader } from '../../../../node_modules/@agm/core';
import { AstamangalaRequest } from '../../../Models/Astamangala/AstamangalaRequest';
import { SelectBoxModel } from '../../../Models/SelectBoxModel';


@Component({
    selector: 'app-astamangala',
    templateUrl: './astamangala.component.html',
    styleUrls: ['./astamangala.component.scss']
})
export class AstamangalaComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    isFalse:boolean=false;

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }

    ngOnInit(){
        this.mapsAPILoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
            types: ["address"]
          });
          autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.getTimezone(this.latitude,this.longitude);
          }); 
        });
      });
      }
      astamangalaForm: FormGroup;
      astamangalaRequest: AstamangalaRequest;
      timeZoneName: any;
      timeZoneId: any;
      latitude: number;
      longitude: number;
      timeformats: SelectBoxModel[] = [
        { Id: "STANDARD", Text: 'Standard Time' },
        { Id: "SUMMER", Text: 'Summer Time' },
        { Id: "DOUBLE", Text: 'Double Summer Time' },
        { Id: "WAR", Text: 'War Time' }
      ];
      genders: string[];
      opened(e) {
        e.component
          .content()
          .getElementsByClassName("dx-box-item")[0].style.display =
          "none";
          // e.component.content().getElementsByClassName("dx-toolbar-button")[0].style.padding =
          // "25px";
        e.component.content().style.width = "320px";
      }
      constructor(private route: ActivatedRoute, private router: Router,private cdr:ChangeDetectorRef, 
        private partyService: PartyService, public horoScopeService: HoroScopeService, public uiService: UIService, 
        public smartHttpClient: SmartHttpClient, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {    
        this.genders = ["Male", "Female"];
        this.astamangalaForm=this.formbuilder.group({
          date: ['', [Validators.required]],
          time: ['', [Validators.required]],
          place: ['',[Validators.required]],
          timeformat: ['',[Validators.required]],
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
        
        const dateContrl = this.astamangalaForm.get('date');
        dateContrl.valueChanges.subscribe(value => this.setErrorMessage(dateContrl));
        const timeContrl = this.astamangalaForm.get('time');
        timeContrl.valueChanges.subscribe(value => this.setErrorMessage(timeContrl));
        const placeContrl = this.astamangalaForm.get('place');
        placeContrl.valueChanges.subscribe(value => this.setErrorMessage(placeContrl));
    
        this.astamangalaRequest = {
          Name: null,
          Father: null,
          Mother: null,
          Gothra: null,
          Date: null,
          Time: null,
          TimeFormat: null,
          LatDeg: this.astamangalaForm.controls['LatDeg'].value,
          LatMt: this.astamangalaForm.controls['LatMt'].value,
          LongDeg: this.astamangalaForm.controls['LongDeg'].value,
          LongMt: this.astamangalaForm.controls['LongMt'].value,
          NS: this.astamangalaForm.controls['NS'].value,
          EW: this.astamangalaForm.controls['EW'].value,
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
        document.getElementById('err_' + control).innerHTML='';//To not display the error message, if there is no error.
        if ((c.touched || c.dirty) && c.errors) {
          document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
        }
      }
      private validationMessages = { //used in above method.
        date_required: '*Select Date',
    
        time_required: '*Select Time',
    
        place_required: '*Enter Place'
    
      };
    
      getTimezone(lat, long) {
        this.astamangalaRequest.LatDeg = parseInt(lat);
        this.astamangalaRequest.LongDeg = parseInt(long);
        this.astamangalaRequest.LatMt = parseInt(Math.abs((lat - this.astamangalaRequest.LatDeg) * 60).toString());
        this.astamangalaRequest.LongMt = parseInt(Math.abs((long - this.astamangalaRequest.LongDeg) * 60).toString());
        if (lat < 0) {
          this.astamangalaRequest.NS = "S";
        }
        else {
          this.astamangalaRequest.NS = "N";
        }
        if (long < 0) {
          this.astamangalaRequest.EW = "W";
        }
        else {
          this.astamangalaRequest.EW = "W";
        }
        this.horoScopeService.getTimezone(lat, long).subscribe((data: any) => {
          this.astamangalaRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
          this.astamangalaRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.astamangalaRequest.ZH) * 60).toString());
          if (data.rawOffset < 0) {
            this.astamangalaRequest.PN = "-";
          }
          else {
            this.astamangalaRequest.PN = "+";
          }
          this.timeZoneName = data.timeZoneName;
          this.timeZoneId = data.timeZoneId;
          //this.cdr.detectChanges();
        });
      }
    
      OnMouseUp(event) {
        if (event == null) {
          this.timeZoneName = null;
        }
      }
     
      goToPrashnoInputs(params){
        // const myModalOptions: ModalOptions = {
        //   enableBackdropDismiss: false,
        //   cssClass : 'mymodal'
        // };
        // let profileModal = this.modalCtrl.create(PrashnoInputsPage, myModalOptions);
        // profileModal.present();
       }
}

