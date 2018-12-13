import { Injectable, ViewChild } from "@angular/core";
import { SmartHttpClient } from "../shared/http-client/smart-httpclient.service";
import { Observable } from "rxjs";
import { SalesResponse } from "../../Models/Sales/SalesResponse";
import { HttpClient, HttpBackend, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HoroRequest } from "src/Models/HoroScope/HoroRequest";



@Injectable()
export class HoroScopeService {
    Shloka1: string;
    Shloka2: string;
    JanmaNakshatra: any;
    OrderId: any;
    existingAddress: any;
    defaultAddress: any;
    paymentModes: any;
    horoRequest: HoroRequest;
    data:any;
    ItActId='#SH';
    //@ViewChild(Nav) nav;
    // constructor(public navCtrl: NavController,public smartHttpClient: SmartHttpClient) {
    constructor(handler: HttpBackend, public http: HttpClient, public smartHttpClient: SmartHttpClient) {
        this.http = new HttpClient(handler);
    }
    //:Observable<SalesResponse>
    GetFreeData(horoRequest, callback: (data) => void) {
        var endPoint = "HoroScope/GetFreeData";
        return this.smartHttpClient.Post(endPoint, horoRequest).subscribe((data: any) => {

            callback(data);
        });
    }
    GetHoroReport(){
        var url = "http://www.astrolite.in/wcf/webhoroapi/api/result/horoscopereport";
        return this.http.get(url, { responseType: "blob", headers:new HttpHeaders().append('Content-Type','application/json') }).catch(this.handleEror);
    }
    private handleEror(err:HttpErrorResponse){
        alert(err);
        return ""
    }
    CreateOrder(orderModel, callback: (data) => void) {
        var endPoint = "Order/CreateOrder";
        return this.smartHttpClient.Post(endPoint, orderModel).subscribe((data: any) => {
            this.OrderId = data;
            callback(data);
        });
    }
    GetAllAddress(PartyMastId, callback: (data) => void) {
        var endPoint = "Address/GetAllAddress";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            this.existingAddress = data;
            callback(data);
        });
    }
    GetDefaultAddress(PartyMastId, callback: (data) => void){ 
        var endPoint = "Address/GetDefaultAddress";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            this.defaultAddress = data;
            console.log(data);
            callback(data);
        });
    }
    GetHoroScopeItems(callback: (data) => void) {
        var endPoint = "Item/GetHoroScopeItems";
        this.smartHttpClient.Get(endPoint).subscribe((data: any) => {
            var items = data;
            callback(data);
        });
    }
    CreateAddress(addessModel, callback: (data) => void) {
        var endPoint = "Address/CreateAddress";
        return this.smartHttpClient.Post(endPoint, addessModel).subscribe((data: any) => {
            var gg = data;
            var PartyMastId="1";
            // this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            //     this.existingAddress = data;
            // });
            callback(data);
        });
    }
    CreateAndUpdateOrder(addessModel, callback: (data) => void){
        var endPoint = "Address/CreateAndUpdateOrder";
        return this.smartHttpClient.Post(endPoint, addessModel).subscribe((data: any) => {
            var hh = data;
            callback(data);
        });
    }
    UpdateAddressToOrder(orderAddress, callback: (data) => void){
        var endPoint = "Order/UpdateAddressToOrder";
        return this.smartHttpClient.Post(endPoint, orderAddress).subscribe((data: any) => {
            var hh = data;
            callback(data);
        });
    }
    GetPayCodes(callback: (data) => void){
        var endPoint = "Sales/GetPayCodes";
    this.smartHttpClient.Get(endPoint).subscribe((data: any) => {
      this.paymentModes = data;
      callback(data);
    });
    }
    GetWalletBalance(PartyMastId,callback: (data) => void){
        var endPoint = "Wallet/GetWalletBalance";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            var balance = data;
            console.log(data);
            callback(data);
        });
    }
    ValidateCouponCode(orderAddress, callback: (data) => void){
        var endPoint = "Sales/ValidateCouponCode";
        return this.smartHttpClient.Post(endPoint, orderAddress).subscribe((data: any) => {
            var hh = data;
            callback(data);
        });
    }
    CreateBillPayModeToOrder(orderAddress, callback: (data) => void){
        var endPoint = "Order/CreateBillPayModeToOrder";
        return this.smartHttpClient.Post(endPoint, orderAddress).subscribe((data: any) => {
            var hh = data;
            callback(data);
        });
    }
    PaymentComplete(payment, callback: (data) => void){
        var endPoint = "Order/PaymentComplete";
        return this.smartHttpClient.Post(endPoint, payment).subscribe((data: any) => {
            var hh = data;
            callback(data);
        });

    }
    GetEMailAddress(PartyMastId,callback: (data) => void){
        var endPoint = "Party/GetEMailAddress";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            var balance = data;
            console.log(data);
            callback(data);
        });
    }
    getTimezone(lat, long) {
        var apiKey = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
        //https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ
        var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
        // var response = GoogleAppsScript.URL_Fetch.UrlFetchApp.fetch(url);
        // var data = JSON.parse(response.getContentText());
        // return data["timeZoneName"];
        return this.http.get(url);

    }


    // getCustomers() {
    //     return customers;
    // }
    getInfo() {
        return payusing;
    }
}
export class ServiceInformation {
    Id:string;
    ItemName:string;
    View:string;
    Description:string;
    HardCopy: number;
    SoftCopy: number;
}
export class ServiceInfo {
    // Description: string;
    // ViewSample: string;
    // Price: number;
    // Buy: string;

    Id:string;
    ItemName:string;
    View:string;
    Description:string;
    HardCopy: number;
    SoftCopy: number;
}
export class PaymentInfo {
    Title: string;
}
// let customers: ServiceInfo[] = [{
//     "Description": "Mini Format",
//     "ViewSample": "View",
//     "Price": 250,
//     "Buy": "Buy"
// }, {
//     "Description": "Medium Format",
//     "ViewSample": "View",
//     "Price": 500,
//     "Buy": "Buy"
// }, {
//     "Description": "Full Horoscope",
//     "ViewSample": "View",
//     "Price": 750,
//     "Buy": "Buy"
// }];

let payusing: PaymentInfo[] = [{
    "Title": "Astrolite Wallet"
}, {
    "Title": "Payment Gateway"
}];
