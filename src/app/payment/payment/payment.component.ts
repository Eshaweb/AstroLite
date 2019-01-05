import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Location } from "@angular/common";
import { LoginService } from 'src/Services/login/login.service';
import { SmartHttpClient } from 'src/Services/shared/http-client/smart-httpclient.service';
import { UIService } from 'src/Services/UIService/ui.service';
import { HoroScopeService, ServiceInfo } from 'src/Services/HoroScopeService/HoroScopeService';
import { Platform } from '@angular/cdk/platform';
import { PayCode } from 'src/Models/Sales/PayCode';
import { IgxComboComponent } from 'igniteui-angular';
declare var Razorpay: any;


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    WalletCheckBoxValue: boolean = false;
    loading: boolean = false;
    paymentModes: any;
    walletbalance: any;
    ItemOrdered: ServiceInfo;
    CoupenCodeForm: FormGroup;
    couponcodeMessage: string;
    discountAmount: string;
    payableAmount: any;
    paycodes: PayCode[] = [];
    differenceAmount: any;
    selectMeMessage: string;
    paymentmodeSelected: boolean = false;
    ShowMessage: string;
    selectboxdisabled: boolean = false;
    OrderId: string;
    paymentId: any;
  
    constructor(public _location: Location, public route: ActivatedRoute, public router: Router,
      public formBuilder: FormBuilder, public platform: Platform, public formbuilder: FormBuilder,
      public loginService: LoginService, public horoScopeService: HoroScopeService,
      public smartHttpClient: SmartHttpClient, public uiService: UIService) {
      this.discountAmount = "0";
      
      this.OrderId = this.horoScopeService.OrderId;
      this.ItemOrdered = this.horoScopeService.itemOrdered;
      //this.payableAmount = this.ItemOrdered.SoftCopy;
      if (this.horoScopeService.IsDeliverable == false) {
        this.payableAmount = this.horoScopeService.itemOrdered.Amount;
      }
      else {
        this.payableAmount = this.horoScopeService.itemOrdered.PrintAmount;
      }
      this.horoScopeService.GetPayCodes((data) => {
        this.paymentModes = data;
        this.GetWalletBalance();
      });
      this.CoupenCodeForm = this.formbuilder.group({
        couponcode: ['', [Validators.required, Validators.minLength(6)]],
      });
      const couponcodeContrl = this.CoupenCodeForm.get('couponcode');
      couponcodeContrl.valueChanges.subscribe(value => this.setErrorMessage(couponcodeContrl));
    }
  
    ngOnInit(): void {
      /*
      */
    }
  
    ngAfterViewInit(): void {
    }
  
    ngOnDestroy(): void {
  
    }
    backClicked() {
      this._location.back();
    }
  
    setErrorMessage(c: AbstractControl): void {
      let control = this.uiService.getControlName(c);
      document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
      if ((c.touched || c.dirty) && c.errors) {
        document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
      }
    }
    private validationMessages = {
      couponcode_required: 'Enter Coupon Code if you have',
      couponcode_minlength: 'Minimum length should be 6'
    };
    GetWalletBalance() {
      this.horoScopeService.GetWalletBalance(this.loginService.PartyMastId, (data) => {
        this.walletbalance = data;
        // this.walletbalance = 100;
      });
    }
    onClick() {
      var CouponModel = {
        PartyMastId: this.loginService.PartyMastId,
        CouponCode: this.CoupenCodeForm.controls['couponcode'].value
      }
      this.horoScopeService.ValidateCouponCode(CouponModel, (data) => {
  
      });
    }
    checkBox_valueChanged(event) {
      // if (this.WalletCheckBoxValue == false) {
      //   this.WalletCheckBoxValue = true;
      // }
      // else {
      //   this.WalletCheckBoxValue = false;
      // }
      if (this.walletbalance < this.payableAmount && event.value == true) {
        if (this.walletbalance == 0) {
  
        }
        else {
          this.differenceAmount = (this.payableAmount - this.walletbalance).toFixed(2);
          this.differenceAmount = +this.differenceAmount;
        }
      }
      else if (this.walletbalance > this.payableAmount && event.value == true) {
        this.selectboxdisabled = true;
      }
      else {
        this.differenceAmount = 0;
      }
    }
  
    onContinue() {
      if (this.WalletCheckBoxValue == true) {
        this.loading = true;
        if (this.differenceAmount > 0 && this.paymentmodeSelected == true) {
          this.paycodes.push({
            Code: "W",
            Amount: this.walletbalance
          });
          var OrderBillPayMode = {
            CoupenCode: "",
            PartyMastId: this.loginService.PartyMastId,
            OrderId: this.OrderId,
            PayCodes: this.paycodes
          }
          this.horoScopeService.CreateBillPayModeToOrder(OrderBillPayMode, (data) => {
            for (var i = 0; i < data.PayModes.length; i++) {
              if (data.PayModes[i] == "L") {
                var Payment = {
                  ExtCode: data.ExtCode,
                  Amount: this.differenceAmount,
                  PayCode: data.PayModes[i]
                }
                // this.pay(Payment);
                this.pay();
              }
            }
  
          });
        }
        else if (this.differenceAmount > 0 && this.paymentmodeSelected == false) {
          this.selectMeMessage = "Please select any Payment modes for Remaining Amount";
          //loading.dismiss();
        }
        else {
          this.paycodes = [{
            Code: "W",
            Amount: this.payableAmount
          }];
          var OrderBillPayMode = {
            CoupenCode: "",
            PartyMastId: this.loginService.PartyMastId,
            OrderId: this.OrderId,
            PayCodes: this.paycodes
          }
          this.horoScopeService.CreateBillPayModeToOrder(OrderBillPayMode, (data) => {
            //loading.dismiss();
          });
        }
        this.loading = false;
      }
      else {
        this.loading = true;
        if (this.paymentmodeSelected == true) {
          var OrderBillPayMode = {
            CoupenCode: "",
            PartyMastId: this.loginService.PartyMastId,
            OrderId: this.OrderId,
            PayCodes: this.paycodes
          }
          this.horoScopeService.CreateBillPayModeToOrder(OrderBillPayMode, (data) => {
            //loading.dismiss();
            //after 3 min delay,rise below method
            if (data.Status == "P" && data.PayModes[0] == "L") {
              this.horoScopeService.ExtCode = data.ExtCode;
              //this.router.navigate(['/services/paymentProcessing']);
  
              //this.pay(Payment);
              this.pay();
            }
            else if (data.Status == "P" && data.PayModes[0] == "C") {
              this.ShowMessage = "Hi, Order Placed. You will get the product once after your payment done through Cash";
              this.router.navigate(['/services/paymentProcessing']);
            }
            else if (data.Status == "C" && data.PayModes[0] == "W") {
              this.ShowMessage = "Payment Completed";
              this.router.navigate(['/services/paymentProcessing']);
            }
            else if (data.Status == "C") {
              this.ShowMessage = "Payment Completed";
              this.router.navigate(['/services/paymentProcessing']);
            }
          });
        }
        else {
          this.selectMeMessage = "Please select any Payment modes";
          //loading.dismiss();
        }
        this.loading = false;
      }
    }
    @ViewChild('combo', { read: IgxComboComponent })
    combo: IgxComboComponent;
  
    selecting = false;
    ObjChanged(event) {
      if (!this.selecting) {
        let removed = false;
        for (let i = 0; i < event.newSelection.length; i++) {
          for (let j = 0; j < event.oldSelection.length; j++) {
            if (event.oldSelection[j] === event.newSelection[i]) {
              event.newSelection.splice(i, 1);
              removed = true;
            }
          }
        }
  
        if (removed) {
          this.selecting = true;
          this.combo.deselectAllItems();
          this.combo.selectItems(event.newSelection);
          this.selecting = false;
        }
      }
  
      if (this.WalletCheckBoxValue == true && this.differenceAmount > 0) {
        this.paycodes.push({
          //Code: event.value,
          Code: event.newSelection[0].Id,
          Amount: this.differenceAmount
        });
        this.paymentmodeSelected = true;
        this.selectMeMessage = '';
      }
  
      else {
        // this.paycodes.push({
        //   //Code: event.value,
        //   Code:event.newSelection[0].Id,
        //   Amount: this.payableAmount
        // });
        this.paycodes = [{ Code: event.newSelection[0].Id, Amount: this.payableAmount }];
        this.paymentmodeSelected = true;
        this.selectMeMessage = '';
      }
    }
  
    //pay(Payment) {
    pay() {
      var options = {
        description: 'Credits towards AstroLite',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_fg8RMT6vcRs4DP',
        amount: this.payableAmount * 100,
        name: 'Shailesh',
        "handler": (response) => {
          this.paymentId = response.razorpay_payment_id;
          var Payment = {
            PaymentId: this.paymentId
          }
          this.next(Payment);
        },
        prefill: {
          email: 'shailesh@eshaweb.com',
          contact: '9731927204',
          name: 'Shailesh'
        },
        notes: {
          order_id: this.horoScopeService.ExtCode,
        },
        theme: {
          color: '#F37254'
        },
        modal: {
          ondismiss: () => {
            //alert('dismissed');
          }
        }
      };
      var rzp1 = new Razorpay(options, successCallback, cancelCallback);
      rzp1.open();
      
      // document.getElementById('rzp-button1').onclick = function(e){
      //     rzp1.open();
      //     e.preventDefault();
      // }
      var successCallback = (payment_id) => {
        alert('payment_id: ' + payment_id);
      };
  
      var cancelCallback = (error) => {
        alert(error.description + ' (Error ' + error.code + ')');
      };
      //  RazorpayCheckout.open(options, successCallback, cancelCallback);
    }
  
    next(Payment) {
      this.loading = true;
      this.horoScopeService.PaymentComplete(Payment, (data) => {
      this.horoScopeService.resultResponse=data;
      // if(data.Refresh==true){
      //   // this.horoScopeService.CheckForResult(this.horoScopeService.OrderId, (data) => {

      //   // });

      // }
      // else{

      // }
      this.router.navigate(['/services/paymentProcessing'], { skipLocationChange: true });
        // if (data == true) {
        //   this.ShowMessage = "Payment Completed";
        //   this.loading = false;
        //   this.router.navigate(['/services/paymentProcessing']);
        // }
        // else{
        //   this.ShowMessage = "Payment not Completed";
        //   this.loading = false;
        // }
      });
    }

}

