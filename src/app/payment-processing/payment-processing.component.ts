import { Component, OnInit } from '@angular/core';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit {
  ShowMessage: string;

  constructor(public horoScopeService:HoroScopeService) { 
    // var Payment = {
    //   PaymentId:this.horoScopeService.PaymentId
    // }
    // this.horoScopeService.PaymentComplete(Payment, (data) => {
    //   if (data == true) {
    //     this.ShowMessage = "Payment Completed";
    //     //this.navCtrl.push(PaymentSuccessPage);
    //   }
    // });
  }

  ngOnInit() {
  }

}
