import { Injectable, ViewChild } from "@angular/core";
import { SmartHttpClient } from "../shared/http-client/smart-httpclient.service";
import { Observable } from "rxjs";
import { SalesResponse } from "../../Models/Sales/SalesResponse";
import { HttpClient, HttpBackend, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HoroRequest } from "src/Models/HoroScope/HoroRequest";
import { OrderResponse } from "src/Models/OrderResponse";
import { ResultResponse } from "src/Models/ResultResponse";



@Injectable()
export class HoroScopeService {
    resultResponse:ResultResponse;
    orderResponse:OrderResponse;
    PaymentId: string;
    ExtCode: string;
    OrderId: string;
    Fathername: string;
    Mothername: string;
    birthplace: string;
    IsDeliverable: boolean;
    Shloka1: string;
    Shloka2: string;
    JanmaNakshatra: string;
    existingAddress: any;
    defaultAddress: any;
    paymentModes: any;
    horoRequest: HoroRequest;
    birthDateinDateFormat:Date;
    birthTimeinDateFormat:Date;
    AstroReportId:string;
    itemOrdered: ServiceInfo;
    data: any;
    ItActId = '#SH';
    birthplaceShort: string;
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
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });

    }

    private api = 'https://astroliteapi.azurewebsites.net/api/';
    // ProcessOrder(){
    //     return this.http.get(this.api + 'Test/ProcessOrder').catch(this.handleError); 
    //   }
    //   ProcessOrders(TestDTO){
    //     return this.http.post(this.api + 'Test/ProcessOrders', TestDTO).catch(this.handleError); 
    //   }
    // ProcessOrder(callback: (data) => void){
    //     var endPoint = "Test/ProcessOrder";
    //     return this.smartHttpClient.Get(endPoint).subscribe((data: any) => {
    //         callback(data);
    //     });
    // }
    //   ProcessOrders(TestDTO, callback: (data) => void){
    //     var endPoint = "Test/ProcessOrders";
    //     return this.smartHttpClient.Post(endPoint, TestDTO).subscribe((data: any) => {
    //         var fff = data;
    //         callback(data);
    //     });      
    // }
    //  GetFreeData(horoRequest) {
    //     var url = "http://astroliteapi.azurewebsites.net/api/HoroScope/GetFreeData";
    //     var endPoint = "HoroScope/GetFreeData";
    //     return this.http.post(url, horoRequest);
    // }
     //ProcessOrder(FreePDF, callback: (data) => void){
    ProcessOrder(FreePDF) {
        //  var url = "https://testastroapi.azurewebsites.net/api/Result/ProcessOrder";
        var url = "https://astroliteapi.azurewebsites.net/api/Result/ProcessOrder";
        //     var endPoint = "Result/ProcessOrder";
    //     //return this.http.get(url).catch(this.handleEror);
    //     // return this.http.get(url, { responseType: "blob", headers:new HttpHeaders().append('Content-Type','application/json') }).catch(this.handleEror);
    //     // this.smartHttpClient.Get(endPoint).subscribe((data: any) => {
    //     //     var gg = data;
    //     //     callback(data);
    //     //   });
        return this.http.post(url, FreePDF, { responseType: "blob" });
        //  return this.smartHttpClient.Post(endPoint, FreePDF).subscribe((data: any) => {
        //     var yyy = data;
        // });
    }
    // DownloadResult(AstroReportId){
    //     var url = "http://astroliteapi.azurewebsites.net/api/Order/DownloadResult?";
    //     var data = "AstroReportId=" + AstroReportId;
    //     return this.http.get(url + data, { responseType: "blob" });
    // }
    DownloadResult(AstroReportId, callback: (data) => void){
        var url = "https://astroliteapi.azurewebsites.net/api/Order/DownloadResult?";
        var endPoint = "Order/DownloadResult";
        var data = "AstroReportId=" + AstroReportId;
        this.smartHttpClient.DownloadResultById(endPoint, data).subscribe((data: any) => {
            this.existingAddress = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    Test(AstroReportId, callback: (data) => void){
        var url = "https://astroliteapi.azurewebsites.net/api/Order/Test?";
        var endPoint = "Order/Test";
        var data = "AstroReportId=" + AstroReportId;
        return this.smartHttpClient.DownloadResultById(endPoint, data).subscribe((data: any) => {
            this.existingAddress = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
        //return this.http.get(url + data, { responseType: "blob" });
    }
    GetSample(horoSample) {
        var url = "http://astroliteapi.azurewebsites.net/api/Result/GetSample";
        return this.http.post(url, horoSample, { responseType: "blob" });
    }
    private handleEror(err: HttpErrorResponse) {
        alert(err);
        return "";
    }
    // GetPayCodes() {
    //     var url = "http://astroliteapi.azurewebsites.net/api/Sales/GetPayCodes";
    //     var endPoint = "Sales/GetPayCodes";
    //     return this.http.get(url);
    //   }
    CreateOrder(orderModel, callback: (data) => void) {
        var endPoint = "Order/CreateOrder";
        return this.smartHttpClient.Post(endPoint, orderModel).subscribe((data: any) => {
            this.OrderId = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    TestById(OrderId) {
        var url = "http://astroliteapi.azurewebsites.net/api/Result/Test?";
        //var url = "http://astroliteapi.azurewebsites.net/api/Result/Test";
        var endPoint = "Result/Test";
        var data = "Id=" + OrderId;
        //return this.http.get(url+ data, { responseType: "blob"});
        return this.http.get(url + data, { responseType: "blob" });
        // this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
        //     var balance = data;
        //     console.log(data);
        //     callback(data);
        // });
    }
    // Test(callback: (data) => void) {
    //     var endPoint = "HoroScope/Test";
    //     return this.smartHttpClient.Get(endPoint).subscribe((data: any) => {
    //         callback(data);
    //     });
    // }
    GetAllAddress(PartyMastId, callback: (data) => void) {
        var endPoint = "Address/GetAllAddress";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            this.existingAddress = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    GetDefaultAddress(PartyMastId, callback: (data) => void) {
        var endPoint = "Address/GetDefaultAddress";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            this.defaultAddress = data;
            console.log(data);
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    GetPriceListByItActId(ItemMast, callback: (data) => void) {
        var endPoint = "Item/GetPriceListByItActId";
        this.smartHttpClient.Post(endPoint, ItemMast).subscribe((data: any) => {
            var items = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    GetItemPrice(HardCopyPriceRequest, callback: (data) => void) {
        var endPoint = "Item/GetItemPrice";
        this.smartHttpClient.Post(endPoint, HardCopyPriceRequest).subscribe((data: any) => {
            var items = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    CreateAddress(addessModel, callback: (data) => void) {
        var endPoint = "Address/CreateAddress";
        return this.smartHttpClient.Post(endPoint, addessModel).subscribe((data: any) => {
            var gg = data;
            var PartyMastId = "1";
            // this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            //     this.existingAddress = data;
            // });
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    DeleteAddress(addessModel, callback: (data) => void) {
        var endPoint = "Address/DeleteAddress";
        return this.smartHttpClient.Post(endPoint, addessModel).subscribe((data: any) => {
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    CreateAndUpdateOrder(addessModel, callback: (data) => void) {
        var endPoint = "Address/CreateAndUpdateOrder";
        return this.smartHttpClient.Post(endPoint, addessModel).subscribe((data: any) => {
            var hh = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    UpdateAddressToOrder(orderAddress, callback: (data) => void) {
        var endPoint = "Order/UpdateAddressToOrder";
        return this.smartHttpClient.Post(endPoint, orderAddress).subscribe((data: any) => {
            var hh = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    // PaymentComplete(, callback: (data) => void){
    //     var endPoint = "Order/PaymentComplete";
    //     return this.smartHttpClient.Post(endPoint, orderAddress).subscribe((data: any) => {
    //         var hh = data;
    //         callback(data);
    //     });
    // }


    GetPayCodes(callback: (data) => void) {
        var endPoint = "Sales/GetPayCodes";
        this.smartHttpClient.Get(endPoint).subscribe((data: any) => {
            this.paymentModes = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    GetWalletBalance(PartyMastId, callback: (data) => void) {
        var endPoint = "Wallet/GetWalletBalance";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            var balance = data;
            console.log(data);
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    ValidateCouponCode(orderAddress, callback: (data) => void) {
        var endPoint = "Sales/ValidateCouponCode";
        return this.smartHttpClient.Post(endPoint, orderAddress).subscribe((data: any) => {
            var hh = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    CreateBillPayModeToOrder(orderAddress, callback: (data) => void) {
        var endPoint = "Order/CreateBillPayModeToOrder";
        return this.smartHttpClient.Post(endPoint, orderAddress).subscribe((data: any) => {
            var hh = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    PaymentComplete(payment, callback: (data) => void) {
        var endPoint = "Order/PaymentComplete";
        return this.smartHttpClient.Post(endPoint, payment).subscribe((data: any) => {
            var hh = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });

    }
    CheckForResult(OrderId, callback: (data) => void) {
        var endPoint = "Order/CheckForResult";
        var data = "OrderId=" + OrderId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            var balance = data;
            console.log(data);
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }

    GetEMailAddress(PartyMastId, callback: (data) => void) {
        var endPoint = "Party/GetEMailAddress";
        var data = "PartyMastId=" + PartyMastId;
        this.smartHttpClient.GetById(endPoint, data).subscribe((data: any) => {
            var balance = data;
            console.log(data);
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
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
    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = null;
        if (err.status == 401) {
            errorMessage = 401;
            // this.SetRefreshTokenNeeded();
            // var RefreshToken=localStorage.getItem('refreshToken');
            // this.GetToken(RefreshToken).subscribe((data: any) => {
            //     this.SetToken(data.AccessToken);
            //     this.RefreshToken = data.RefreshToken;
            //     StorageService.SetItem('refreshToken', this.RefreshToken);
            // });
        }
        else if (err.status == 0) {
            errorMessage = 'Internal Server Error';
            console.clear();
        }
        else if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error}`;
        }
        else if (err == null || err == undefined) {
            errorMessage = 'Network Error';
        }
        else {
            if (err.error != null) {
                if (typeof err.error === 'string') {
                    errorMessage = err.error;
                }
                // else if (err.error instanceof ErrorFromServer) {
                //     //err.error.find(x => x.username == '2');
                // }
                else if (err.error.Errors != undefined) {
                    for (var i = 0; i < err.error.Errors.length; i++) {
                        errorMessage = err.error.Errors[i].ErrorString;
                    }
                }
                else {
                    errorMessage = err.error;
                }
            }
            else {
                errorMessage = 'Network Error';
            }
        }

        console.log(errorMessage);
        // if (errorMessage != '') {
        if (errorMessage != null) {
            return Observable.throw(errorMessage);
        } else {
            return Observable.throw(err);
        }
    }

    getInfo() {
        return payusing;
    }
}
export class ServiceInformation {
    ItMastId: string;
    Name: string;
    Description: string;
    MRP: number;
    Amount: number;
    PrintMRP: number;
    PrintAmount: number;
}
export class ServiceInfo {
    ItMastId: string;
    Name: string;
    Description: string;
    MRP: number;
    Amount: number;
    PrintMRP: number;
    PrintAmount: number;
    IsHardCopy?: boolean;
}
export class PaymentInfo {
    Title: string;
}

let payusing: PaymentInfo[] = [{
    "Title": "Astrolite Wallet"
}, {
    "Title": "Payment Gateway"
}];
