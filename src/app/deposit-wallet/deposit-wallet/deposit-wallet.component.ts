import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { PayCode } from 'src/Models/Sales/PayCode';
import { ServtrDet } from 'src/Models/Sales/SalesModel';
import { SalesService } from 'src/Services/sales/sales.service';
import { SmartHttpClient } from 'src/Services/shared/http-client/smart-httpclient.service';
import { UIService } from 'src/Services/UIService/ui.service';


@Component({
    selector: 'app-deposit-wallet',
    templateUrl: './deposit-wallet.component.html',
    styleUrls: ['./deposit-wallet.component.scss']
})
export class DepositWalletComponent {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    depositToWalletForm: FormGroup;
  showError: boolean = false;
  walletAmount: number;
  bonusAmount: number;
  amountMessage: string;
  paymentModes: any;
  paycode: PayCode[];
  servtrDets: ServtrDet[];


  constructor(private route: ActivatedRoute, private router: Router, public salesService:SalesService,
    public smartHttpClient: SmartHttpClient, public uiService: UIService, public formbuilder: FormBuilder) {
    var endPoint = "Sales/GetPayCodes";
    this.depositToWalletForm = this.formbuilder.group({
      // amount: [null, [Validators.required, Validators.minLength(1),Validators.pattern("^[a-z0-9_-]{8,15}$"),Validators.min(50),Validators.max(20000)]],
      amount: [null, [Validators.required, Validators.pattern("[50<>20000]=?|="), Validators.min(50), Validators.max(20000)]],
    });
    const amountContrl = this.depositToWalletForm.get('amount');
    amountContrl.valueChanges.subscribe(value => this.setErrorMessage(amountContrl));
  
    this.smartHttpClient.Get(endPoint).subscribe((data: any) => {
    //   this.paymentModes = new DataSource({
    //     store: {
    //         type: 'array',
    //         data: data,
    //         key: "Id"
    //     },
    //     sort: [
    //       { selector: "Text", desc: false }
    //     ]
    // });
    });
  
  }
  setErrorMessage(c: AbstractControl): void {
    this.amountMessage = '';
    let control = this.uiService.getControlName(c);
    if ((c.touched || c.dirty) && c.errors) {
      if (control === 'amount') {
        this.amountMessage = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
      }
    }
  }
  private validationMessages = {
    mobileno_required: 'Enter Mobile No',
    mobileno_minlength: 'Minimum length should be 10',

    amount_required: 'Enter EMail',
    amount_pattern: 'Do not match with pattern',
    amount_min: "Minimum Amount is 50",
    amount_max: "Maximum Amount is 20000",

    password_required: 'Enter Password',
    password_minlength: 'Minimum length should be 3',

    confirm_Password_required: 'Re-Enter Password',
    confirm_Password_minlength: 'Minimum length should be 3',

  };

  onClick() {
     this.servtrDets=[{
      ItMastId:"#WALLET",
      FreeAmount:this.bonusAmount,
      ItemAmount:this.depositToWalletForm.controls['amount'].value 
     }]
     const SalesModel={
      PartyMastId:"1",
      Amount:this.depositToWalletForm.controls['amount'].value,
      BillDiscountCode:"",
      Remarks:"xxx",
      PayCodes:this.paycode,
      ServtrDets:this.servtrDets
     }
    this.salesService.Sale(SalesModel);

  }
  ObjChanged(event) {
    this.paycode = [{
      Code: event.value,
      Amount: this.depositToWalletForm.controls['amount'].value
    }]
  }
  onAmount(value) {
    if (value < 50 || value > 20000) {
      this.showError = true;
      this.walletAmount = null;
      this.bonusAmount = null;
    }
    else {
      this.showError = false;
      var a = 30;
      var b = 70;
      var c = 50
      var d = 20000;
      var e = d / c;
      var f = b - a;
      var g = f / e;
      var h = (value / c) * g + a;
      var i = value * ((h / 100) + 1);
      this.walletAmount = i;
      this.bonusAmount = i - value;
    }
  }

}

