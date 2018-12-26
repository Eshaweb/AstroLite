import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { SmartHttpClient } from '../../../Services/shared/http-client/smart-httpclient.service';
import { HoroScopeService } from '../../../Services/HoroScopeService/HoroScopeService';
import { UIService } from '../../../Services/UIService/ui.service';
import { ExistingAddress } from '../../../Models/ExistingAddress';
import { LoginService } from '../../../Services/login/login.service';
import { Location } from "@angular/common";


@Component({
    selector: 'app-delivery-address',
    templateUrl: './delivery-address.component.html',
    styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy, AfterViewInit {
    ngOnInit() {

    }
    customerAddressForm: FormGroup;
    address1Message: string;
    address3Message: string;
    pincodeMessage: string;
    stateMessage: string;
    address2Message: string;
    OrderId: any;
    checkBoxValue: boolean = false;

    existingAddress: ExistingAddress[];
    showAddAddressForm: boolean = false;
    nameMessage: string;
    defaultAddress: any;
    Id: any;
    customerEMailAddressForm: FormGroup;
    email: any;
    DeliveryAddressRequired: boolean;
    constructor(public _location: Location, public route: ActivatedRoute, public router: Router, public loginService: LoginService,
        public horoScopeService: HoroScopeService, public smartHttpClient: SmartHttpClient,
        public uiService: UIService, public formbuilder: FormBuilder) {
        this.route.params.subscribe(params => {
            //this.id = +params['OrderId']; // (+) converts string 'id' to a number
            this.DeliveryAddressRequired = JSON.parse(params['DeliveryAddressRequired']);
            // In a real app: dispatch action to load the details here.
        });
        this.OrderId = this.horoScopeService.OrderId;
        this.customerEMailAddressForm = this.formbuilder.group({
            email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]]
        });
        this.customerAddressForm = this.formbuilder.group({
            name: ['Shailesh', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
            address1: ['Bappanadu', [Validators.required, Validators.minLength(3)]],
            address2: ['Temple Street', [Validators.required, Validators.minLength(4)]],
            address3: ['#4/5-2', [Validators.required, Validators.minLength(4)]],
            pincode: ['574 154', [Validators.required, Validators.minLength(6)]],
            state: ['Karnataka', [Validators.required, Validators.minLength(4)]],
        });
        const nameContrl = this.customerAddressForm.get('name');
        nameContrl.valueChanges.subscribe(value => this.setErrorMessage(nameContrl));
        const emailContrl = this.customerAddressForm.get('email');
        emailContrl.valueChanges.subscribe(value => this.setErrorMessage(emailContrl));
        const address1Contrl = this.customerAddressForm.get('address1');
        address1Contrl.valueChanges.subscribe(value => this.setErrorMessage(address1Contrl));
        const address2Contrl = this.customerAddressForm.get('address2');
        address2Contrl.valueChanges.subscribe(value => this.setErrorMessage(address2Contrl));
        const address3Contrl = this.customerAddressForm.get('address3');
        address3Contrl.valueChanges.subscribe(value => this.setErrorMessage(address3Contrl));
        const pincodeContrl = this.customerAddressForm.get('pincode');
        pincodeContrl.valueChanges.subscribe(value => this.setErrorMessage(pincodeContrl));
        const stateContrl = this.customerAddressForm.get('state');
        stateContrl.valueChanges.subscribe(value => this.setErrorMessage(stateContrl));
        this.horoScopeService.GetEMailAddress(this.loginService.PartyMastId, (data) => {
            this.email = data.EMail;
            var PartyMastId = this.loginService.PartyMastId;
            this.horoScopeService.GetAllAddress(PartyMastId, (data) => {
                this.existingAddress = data;
                this.horoScopeService.GetDefaultAddress(PartyMastId, (data) => {
                    this.Id = String(data);
                });
            });
        });
    }
    setErrorMessage(c: AbstractControl): void {
        let control = this.uiService.getControlName(c);//gives the control name property from particular service.
        document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
        if ((c.touched || c.dirty) && c.errors) {
            document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
        }
    }
    private validationMessages = { //used in above method.
        address1_required: '*Enter City',
        address1_minlength: '*Minimum length is 4',

        email_required: 'Enter EMail',
        email_minlength: 'Minimum length should be 6',
        email_pattern: 'Do not match with EMail pattern',

        address2_required: '*Enter Area/Street Name',
        address2_minlength: '*Minimum length is 4',

        address3_required: '*Enter House No./ Building Name',
        address3_minlength: '*Minimum length is 4',

        name_required: '*Enter Name',
        name_minlength: '*Minimum length is 4',

        pincode_required: '*Enter Pin code',
        pincode_minlength: '*Minimum length is 4',

        state_required: '*Enter State',
        state_minlength: '*Minimum length is 4',

    };
    // checkBox_valueChanged(event) {
    //   if (event.value == true) {
    //     var PartyMastId = this.loginService.PartyMastId;
    //     this.horoScopeService.GetAllAddress(PartyMastId, (data) => {
    //       this.existingAddress = data;
    //       this.horoScopeService.GetDefaultAddress(PartyMastId, (data) => {
    //         this.Id = String(data);
    //       });
    //     });
    //   }
    //   else {

    //   }
    // }
    OnChangeDefaultAddress(Id) {
        this.Id = Id;
    }
    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
    onAddressChanged(event) {

    }
    onAddAddress() {
        this.showAddAddressForm = true;
    }
    onRemoveAddress(Id) {
        // var favourites: Favourites = this.storageService.GetFavourite();
        // var PId = order.Id;
        // favourites = favourites.filter(function (obj) {
        //   return obj.Id !== PId;
        // });
        // this.storageService.SetFavourite(JSON.stringify(favourites));
        var DeleteAddress = {
            PartyMastId: this.loginService.PartyMastId,
            AddressId: Id
        }
        this.horoScopeService.DeleteAddress(DeleteAddress, (data) => {
            if (data == true) {
                this.horoScopeService.GetAllAddress(this.loginService.PartyMastId, (data) => {
                    this.existingAddress = data;
                    this.horoScopeService.GetDefaultAddress(this.loginService.PartyMastId, (data) => {
                        this.Id = String(data);
                    });
                });
            }

        });
    }
    onCancel() {
        this.showAddAddressForm = !this.showAddAddressForm;
    }

    onSaveAddress() {
        var AddressModel = {
            EMail: this.customerAddressForm.controls['email'].value,
            OrderId: this.OrderId,
            PartyMastId: this.loginService.PartyMastId,
            Name: this.customerAddressForm.controls['name'].value,
            Address1: this.customerAddressForm.controls['address1'].value,
            Address2: this.customerAddressForm.controls['address2'].value,
            Address3: this.customerAddressForm.controls['address3'].value,
            PinCode: this.customerAddressForm.controls['pincode'].value
        }
        this.horoScopeService.CreateAddress(AddressModel, (data) => {
            this.horoScopeService.GetAllAddress(this.loginService.PartyMastId, (data) => {
                this.existingAddress = data;
                this.showAddAddressForm = !this.showAddAddressForm;
                this.horoScopeService.GetDefaultAddress(this.loginService.PartyMastId, (data) => {
                    this.Id = String(data);
                });
            });
        });
    }
    backClicked() {
        this._location.back();
    }
    onPlaceOrder() {
        var orderAddress = {
            AddressId: this.Id,
            OrderId: this.OrderId
        }
        this.horoScopeService.UpdateAddressToOrder(orderAddress, (data) => {
            //   this.navCtrl.push(PaymentDetailsPage,{'ItemOrdered':this.navParams.get('ItemOrdered'),'OrderId':this.navParams.get('OrderId')});
            this.router.navigate(["/services/payment"]);

        });
    }

    trackByFn(index, item) {    
        return item.id; // unique id corresponding to the item
     }
}

