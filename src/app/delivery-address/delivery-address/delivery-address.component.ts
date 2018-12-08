import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { LoginService } from '../../../Services/login/login.service';
import { ExistingAddress } from '../../../Models/ExistingAddress';
import { HoroScopeService } from '../../../Services/HoroScopeService/HoroScopeService';
import { SmartHttpClient } from '../../../Services/shared/http-client/smart-httpclient.service';
import { UIService } from '../../../Services/UIService/ui.service';


@Component({
    selector: 'app-delivery-address',
    templateUrl: './delivery-address.component.html',
    styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit, OnDestroy, AfterViewInit {
    ItemOrdered: any;
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
    constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService,
        public horoScopeService: HoroScopeService, public smartHttpClient: SmartHttpClient,
        public uiService: UIService, public formbuilder: FormBuilder) {
        this.route.params.subscribe(params => {
            //this.id = +params['OrderId']; // (+) converts string 'id' to a number
            this.OrderId = params['OrderId'];
            this.DeliveryAddressRequired = params['DeliveryAddressRequired'];
            this.ItemOrdered=params['ItemOrdered'];
            // In a real app: dispatch action to load the details here.
        });

        this.customerEMailAddressForm = this.formbuilder.group({
            email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]]
        });
        this.customerAddressForm = this.formbuilder.group({
            name: ['Shailesh', [Validators.required, Validators.minLength(3)]],
            address1: ['Bappanadu', [Validators.required, Validators.minLength(3)]],
            address2: ['Temple Street', [Validators.required, Validators.minLength(4)]],
            address3: ['#4/5-2', [Validators.required, Validators.minLength(4)]],
            pincode: ['574 154', [Validators.required, Validators.minLength(6)]],
            state: ['Karnataka', [Validators.required, Validators.minLength(4)]],
        });
        const nameContrl = this.customerAddressForm.get('name');
        nameContrl.valueChanges.subscribe(value => this.setErrorMessage(nameContrl));
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
        this.address1Message = '';//To not display the error message, if there is no error.
        this.address2Message = '';
        this.address3Message = '';
        this.pincodeMessage = '';
        this.stateMessage = '';
        this.nameMessage = '';
        let control = this.uiService.getControlName(c);//gives the control name property from particular service.
        if ((c.touched || c.dirty) && c.errors) {
            if (control === 'address1') {
                this.address1Message = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
                //maps the error message from validationMessages array. 
            }
            else if (control === 'address2') {
                this.address2Message = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
            }
            else if (control === 'address3') {
                this.address3Message = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
            }
            else if (control === 'name') {
                this.nameMessage = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
            }
            else if (control === 'pincode') {
                this.pincodeMessage = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
            }
            else if (control === 'state') {
                this.stateMessage = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
            }
        }
    }
    private validationMessages = { //used in above method.
        address1_required: '*Enter City',
        address1_minlength: '*Minimum length is 4',

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
    onRemoveAddress() {
        // var favourites: Favourites = this.storageService.GetFavourite();
        // var PId = order.Id;
        // favourites = favourites.filter(function (obj) {
        //   return obj.Id !== PId;
        // });
        // this.storageService.SetFavourite(JSON.stringify(favourites));
    }
    onCancel() {
        this.showAddAddressForm = !this.showAddAddressForm;
    }

    onSaveAddress() {
        var AddressModel = {
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
            });
        });
    }

    onPlaceOrder() {
        var orderAddress = {
            AddressId: this.Id,
            OrderId: this.OrderId
        }
        this.horoScopeService.UpdateAddressToOrder(orderAddress, (data) => {
            //   this.navCtrl.push(PaymentDetailsPage,{'ItemOrdered':this.navParams.get('ItemOrdered'),'OrderId':this.navParams.get('OrderId')});
            this.router.navigate(["/paymentdetails", { "ItemOrdered": this.ItemOrdered, 'OrderId': this.OrderId}]);

        });
    }
}
