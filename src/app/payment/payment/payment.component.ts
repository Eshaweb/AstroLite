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


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    WalletCheckBoxValue: boolean = false;
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
    OrderId: any;

    constructor(private _location: Location, private route: ActivatedRoute, private router: Router,
        private formBuilder: FormBuilder, private platform: Platform, public formbuilder: FormBuilder,
        private loginService: LoginService, public horoScopeService: HoroScopeService,
        public smartHttpClient: SmartHttpClient, public uiService: UIService) {
        this.discountAmount = "0";
        // let loading = this.loadingController.create({
        //     content: 'Loading the Free HoroScope..'
        // });
        // loading.present();
        this.route.params.subscribe(params => {
            this.OrderId= params['OrderId'];
        });
        this.ItemOrdered = this.horoScopeService.itemOrdered;
        //this.payableAmount = this.ItemOrdered.SoftCopy;
        this.payableAmount = this.horoScopeService.itemOrdered.ActualPrice;
        this.horoScopeService.GetPayCodes((data) => {
            this.paymentModes = data;
            this.GetWalletBalance();
            //loading.dismiss();
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
        this.couponcodeMessage = '';
        let control = this.uiService.getControlName(c);
        if ((c.touched || c.dirty) && c.errors) {
          if (control === 'couponcode') {
            this.couponcodeMessage = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
          }
        }
      }
      private validationMessages = {
        couponcode_required: 'Enter Coupon Code',
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
        // let loading = this.loadingController.create({
        //   content: 'Please wait till we proceed further'
        // });
        // loading.present();
        if (this.WalletCheckBoxValue == true) {
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
              //loading.dismiss();
              for (var i = 0; i < data.PayModes.length; i++) {
                if (data.PayModes[i] == "L") {
                  var Payment = {
                    ExtCode: data.ExtCode,
                    Amount: this.differenceAmount,
                    PayCode: data.PayModes[i]
                  }
                  this.pay();
                  this.horoScopeService.PaymentComplete(Payment, (data) => {
                    if (data == true) {
                      this.ShowMessage = "Payment Completed";
                      //this.router.navigate(['/services/fffff']);
                    }
                  });
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
        }
        else {
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
                var Payment = {
                  ExtCode: data.ExtCode,
                  Amount: this.payableAmount,
                  //PayCode: this.paycodes[0].Code
                  PayCode: data.PayModes[0]
                }
                this.pay();
                // this.horoScopeService.PaymentComplete(Payment, (data) => {
                //   if (data == true) {
                //     this.ShowMessage = "Payment Completed";
                //     this.navCtrl.push(PaymentSuccessPage);
                //   }
                // });
              }
              else if (data.Status == "P" && data.PayModes[0] == "C") {
                this.ShowMessage = "Hi, Order Placed. You will get the product once after your payment done through Cash";
              }
              else if (data.Status == "C" && data.PayModes[0] == "W") {
                this.ShowMessage = "Payment Completed";
                this.router.navigate(['/services/fffff']);
              }
              else if (data.Status == "C") {
                this.ShowMessage = "Payment Completed";
                this.router.navigate(['/services/fffff']);
              }
            });
          }
          else {
            this.selectMeMessage = "Please select any Payment modes";
            //loading.dismiss();
          }
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
            Code: event.value,
            Amount: this.differenceAmount
          });
          this.paymentmodeSelected = true;
          this.selectMeMessage = '';
        }
    
        else {
          this.paycodes.push({
            Code: event.value,
            Amount: this.payableAmount
          });
          this.paymentmodeSelected = true;
          this.selectMeMessage = '';
        }
      }
    
      pay() {
        var options = {
          description: 'Credits towards AstroLite',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_pqy8JaqakPcPA3',
          amount: 1*100,
          name: 'Shailesh',
          prefill: {
            email: 'shailesh@eshaweb.com',
            contact: '9731927204',
            name: 'Shailesh'
          },
          theme: {
            color: '#F37254'
          },
          modal: {
            ondismiss: () => {
              alert('dismissed')
            }
          }
        };
    
        var successCallback = (payment_id) => {
          alert('payment_id: ' + payment_id);
        };
    
        var cancelCallback = (error) => {
          alert(error.description + ' (Error ' + error.code + ')');
        };
        //RazorpayCheckout.open(options, successCallback, cancelCallback);
      }
}

