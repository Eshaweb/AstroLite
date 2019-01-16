import { Component, OnInit, ElementRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { ServiceInfo, HoroScopeService, ServiceInformation } from 'src/Services/HoroScopeService/HoroScopeService';
import { LoginService } from 'src/Services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { FormControlName } from '@angular/forms';
import { HoropaidComponent } from '../horopaid/horopaid/horopaid.component';
import { Location } from "@angular/common";
import { IgxDialogComponent } from 'igniteui-angular';

@Component({
  selector: 'app-paidervices',
  templateUrl: './paidervices.component.html',
  styleUrls: ['./paidervices.component.scss']
})
export class PaidervicesComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChildren('cmp') components: ElementRef;
  @ViewChild("dialog") public dialog: IgxDialogComponent;  
  serviceInfo: ServiceInfo[];
  serviceInformation: ServiceInformation[];
  horoInfo: any;
  horoRequest: HoroRequest;
  checkBoxValue: boolean = false;
  FH_PDFSelected: boolean = false;
  FH_HardcopySelected: boolean = false;
  MH_PDFSelected: boolean = false;
  MH_HardcopySelected: boolean = false;
  PH_PDFSelected: boolean = false;
  PH_HardcopySelected: boolean = false;
  FH_price: number = 0;
  MH_price: number = 0;
  PH_price: number = 0;
  totalprice: number = 0;
  requireDeliveryAddress: boolean;
  PartyMastId: string;
  serviceHardCopy: ServiceInfo[];
    errorMessage: any;
  ngAfterViewInit(){
    console.log(this.components);
  }
  constructor(public _location: Location, public route: ActivatedRoute, public router: Router,
    public loginService: LoginService, public horoScopeService: HoroScopeService) {
    //   this.route.params.subscribe(params => {
    //       this.PartyMastId = params['PartyMastId'];
    //   });
      this.horoInfo = horoScopeService.horoRequest;
      var itemMast = {
          ItActId: "#SH",
          PartyMastId: loginService.PartyMastId,
          //CountryCode: "IN"
      }
      this.horoScopeService.GetPriceListByItActId(itemMast, (data) => {
        if(data.Error==undefined){  
        this.serviceInfo = data;
    }
    else{
      this.errorMessage=data.Error;
      this.dialog.open();
    }
      });
      this.serviceInformation = [{ ItMastId: '', Name: 'Horo', MRP: 33, Amount: 44, Description: '',PrintMRP:6,PrintAmount:5 }]
    }
  ngOnInit(): void {
      /*
      */
  }
  backClicked() {
    this._location.back();
}
  hardcopyRequired_Click(id) {
      var hardCopyPriceRequest={
          IsHardCopy:true,
          ItMastId: id,
          PartyMastId:this.PartyMastId,
          CountryCode:"IN"
      }
      this.horoScopeService.GetItemPrice(hardCopyPriceRequest, (data) => {
          this.serviceHardCopy = data;
      });
  }
//   onFHSample() {
//     this.horoScopeService.ProcessOrder().subscribe((data: any) => {
//         var newBlob = new Blob([data], { type: "application/pdf" });
//         const fileName: string = 'PDFSample.pdf';
//         const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
//         var url = window.URL.createObjectURL(newBlob);
//         a.href = url;
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//       });
//   }
//   onFH_PDFChanged(event) {
//       this.FH_PDFSelected = event.value;
//       if (this.FH_PDFSelected == true && this.FH_HardcopySelected == true) {
//           this.FH_price = 750;
//       }
//       else if (this.FH_PDFSelected == true && this.FH_HardcopySelected == false) {
//           this.FH_price = 375;
//       }
//       else if (this.FH_PDFSelected == false && this.FH_HardcopySelected == true) {
//           this.FH_price = 750;
//       }
//       else if (this.FH_PDFSelected == false && this.FH_HardcopySelected == false) {
//           this.FH_price = 0;
//       }
//       this.totalprice = this.FH_price + this.MH_price + this.PH_price;
//   }
//   onFH_HardcopyChanged(event) {
//       this.FH_HardcopySelected = event.value;
//       if (this.FH_PDFSelected == true && this.FH_HardcopySelected == true) {
//           this.FH_price = 750;
//       }
//       else if (this.FH_PDFSelected == true && this.FH_HardcopySelected == false) {
//           this.FH_price = 375;
//       }
//       else if (this.FH_PDFSelected == false && this.FH_HardcopySelected == true) {
//           this.FH_price = 750;
//       }
//       else if (this.FH_PDFSelected == false && this.FH_HardcopySelected == false) {
//           this.FH_price = 0;
//       }
//       this.totalprice = this.FH_price + this.MH_price + this.PH_price;
//   }
//   onMH_PDFChanged(event) {
//       this.MH_PDFSelected = event.value;
//       if (this.MH_PDFSelected == true && this.MH_HardcopySelected == true) {
//           this.MH_price = 500;
//       }
//       else if (this.MH_PDFSelected == true && this.MH_HardcopySelected == false) {
//           this.MH_price = 250;
//       }
//       else if (this.MH_PDFSelected == false && this.MH_HardcopySelected == true) {
//           this.MH_price = 500;
//       }
//       else if (this.MH_PDFSelected == false && this.MH_HardcopySelected == false) {
//           this.MH_price = 0;
//       }
//       this.totalprice = this.FH_price + this.MH_price + this.PH_price;
//   }
//   onMH_HardcopyChanged(event) {
//       this.MH_HardcopySelected = event.value;
//       if (this.MH_PDFSelected == true && this.MH_HardcopySelected == true) {
//           this.MH_price = 500;
//       }
//       else if (this.MH_PDFSelected == true && this.MH_HardcopySelected == false) {
//           this.MH_price = 250;
//       }
//       else if (this.MH_PDFSelected == false && this.MH_HardcopySelected == true) {
//           this.MH_price = 500;
//       }
//       else if (this.MH_PDFSelected == false && this.MH_HardcopySelected == false) {
//           this.MH_price = 0;
//       }
//       this.totalprice = this.FH_price + this.MH_price + this.PH_price;
//   }
//   on2PH_PDFChanged(event) {
//       this.PH_PDFSelected = event.value;
//       if (this.PH_PDFSelected == true && this.PH_HardcopySelected == true) {
//           this.PH_price = 100;
//       }
//       else if (this.PH_PDFSelected == true && this.PH_HardcopySelected == false) {
//           this.PH_price = 50;
//       }
//       else if (this.PH_PDFSelected == false && this.PH_HardcopySelected == true) {
//           this.PH_price = 100;
//       }
//       else if (this.PH_PDFSelected == false && this.PH_HardcopySelected == false) {
//           this.PH_price = 0;
//       }
//       this.totalprice = this.FH_price + this.MH_price + this.PH_price;
//   }
//   on2PH_HardcopyChanged(event) {
//       this.PH_HardcopySelected = event.value;
//       if (this.PH_PDFSelected == true && this.PH_HardcopySelected == true) {
//           this.PH_price = 100;
//       }
//       else if (this.PH_PDFSelected == true && this.PH_HardcopySelected == false) {
//           this.PH_price = 50;
//       }
//       else if (this.PH_PDFSelected == false && this.PH_HardcopySelected == true) {
//           this.PH_price = 100;
//       }
//       else if (this.PH_PDFSelected == false && this.PH_HardcopySelected == false) {
//           this.PH_price = 0;
//       }
//       this.totalprice = this.FH_price + this.MH_price + this.PH_price;
//   }
//   onPDFSample(ItMastId) {
//       var itemOrdered = this.serviceInfo.find(function (obj) { return obj.ItMastId === ItMastId; });
//       this.horoRequest = {
//           Name: this.horoInfo.Name,
//           Father: this.horoInfo.Father,
//           Mother: this.horoInfo.Mother,
//           Gothra: this.horoInfo.Gothra,
//           Date: this.horoInfo.Date,
//           Time: this.horoInfo.Time,
//           TimeFormat: this.horoInfo.TimeFormat,
//           LatDeg: this.horoInfo.LatDeg,
//           LatMt: this.horoInfo.LatMt,
//           LongDeg: this.horoInfo.LongDeg,
//           LongMt: this.horoInfo.LongMt,
//           NS: this.horoInfo.NS,
//           EW: this.horoInfo.EW,
//           ZH: this.horoInfo.ZH,
//           ZM: this.horoInfo.ZM,
//           PN: this.horoInfo.PN,
//           Gender: "F",
//           LangCode: "KAN"
//       }
//       var orderModel = {
//           FreeAmount: null,
//           //ItemAmount: itemOrdered.SoftCopy,
//           ItemAmount: itemOrdered.Amount,
//           PartyMastId: this.PartyMastId,
//           JSONData: this.horoInfo,
//           //ItActId: "#SH",
//           ItActId: this.horoScopeService.ItActId,
//           ItMastId: ItMastId
//       }
//       this.horoScopeService.CreateOrder(orderModel, (data) => {
//           this.router.navigate(["/deliveryAddress", { "OrderId": data, 'ItemOrdered': itemOrdered }]);
//       });
//   }
//   onSoftCopy(softCopyPrice) {
//     //   var itemOrdered = this.serviceInfo.find(function (obj) { return obj.SoftCopy === softCopyPrice; });
//     var itemOrdered = this.serviceInfo.find(function (obj) { return obj.Amount === softCopyPrice; });
//     var orderModel = {
//           FreeAmount: 0,
//           ItemAmount: softCopyPrice,
//           PartyMastId: this.loginService.PartyMastId,
//           JSONData: this.horoInfo,
//           //ItActId: "#SH",
//           ItActId: this.horoScopeService.ItActId,
//           ItMastId: itemOrdered.ItMastId
//       }
//       var DeliveryAddressRequired: boolean = false;
//       this.horoScopeService.CreateOrder(orderModel, (data) => {
//           //   this.navCtrl.push(DeliveryAddressPage, { 'OrderId': data, 'ItemOrdered': itemOrdered,'DeliveryAddressRequired':DeliveryAddressRequired  });
//           this.router.navigate(["/deliveryAddress", { "OrderId": data, 'ItemOrdered': itemOrdered, 'DeliveryAddressRequired': DeliveryAddressRequired }]);
//       });
//   }
//   onHardCopy(hardCopyPrice) {
//     //   var itemOrdered = this.serviceInfo.find(function (obj) { return obj.HardCopy === hardCopyPrice; });
//     var itemOrdered = this.serviceInfo.find(function (obj) { return obj.Amount === hardCopyPrice; });
//     var orderModel = {
//           FreeAmount: 0,
//           ItemAmount: hardCopyPrice,
//           PartyMastId: this.loginService.PartyMastId,
//           JSONData: this.horoInfo,
//           //ItActId: "#SH",
//           ItActId: this.horoScopeService.ItActId,
//           ItMastId: itemOrdered.ItMastId
//       }
//       var DeliveryAddressRequired: boolean = true;
//       this.horoScopeService.CreateOrder(orderModel, (data) => {
//           //this.navCtrl.push(DeliveryAddressPage, { 'OrderId': data, 'ItemOrdered': itemOrdered ,'DeliveryAddressRequired':DeliveryAddressRequired });
//           this.router.navigate(["/deliveryAddress", { "OrderId": data, 'ItemOrdered': itemOrdered, 'DeliveryAddressRequired': DeliveryAddressRequired }]);
//       });
//   }
  onNext() {
      var orderModel = {
          FreeAmount: 0,
          ItemAmount: this.totalprice,
          PartyMastId: this.loginService.PartyMastId,
          //JSONData: this.horoInfo,
          JSONData: { Name: "Shamanth", Father: "Rajesh", Mother: "Leelavathi", Gothra: "Vasista", Date: "2018-12-21", EW: "W", Gender: "F", LatDeg: 17, LatMt: 24, LongDeg: 78, LongMt: 25, NS: "N", PN: "+", Time: "18:47:00", TimeFormat: "STANDARD", ZH: 5, ZM: 30 },
          //ItActId: "#SH",
          ItActId: this.horoScopeService.ItActId,
          ItMastId: '#HFH'
      }
      if (this.FH_HardcopySelected == true || this.MH_HardcopySelected == true || this.PH_HardcopySelected == true) {
          this.requireDeliveryAddress = true;
      }
      else {
          this.requireDeliveryAddress = false;
      }
      var DeliveryAddressRequired = this.requireDeliveryAddress;
      this.router.navigate(["/deliveryAddress", { 'DeliveryAddressRequired': DeliveryAddressRequired }]);
      // this.horoScopeService.CreateOrder(orderModel, (data) => {
      //   //this.navCtrl.push(DeliveryAddressPage, { 'OrderId': data, 'ItemOrdered': '','DeliveryAddressRequired':DeliveryAddressRequired  });
      //   this.router.navigate(["/deliveryAddress", { "OrderId": data, 'ItemOrdered': '','DeliveryAddressRequired':DeliveryAddressRequired }]);
      // });
  }

  trackByFn(index, item) {    
    return item.id; // unique id corresponding to the item
 }
}
