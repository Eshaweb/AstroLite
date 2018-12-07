import { Injectable } from "@angular/core";
import { SmartHttpClient } from "../shared/http-client/smart-httpclient.service";
import { SalesResponse } from "../../Models/Sales/SalesResponse";





@Injectable()
export class SalesService {
    salesResponse: SalesResponse;

    constructor(public smartHttpClient: SmartHttpClient) {

    }
    Sale(SalesModel){
        var endPoint = "sales/Sale";
        this.smartHttpClient.Post(endPoint,SalesModel).subscribe((data:any) => {
           let yyy = data  as SalesResponse;
if(yyy == null)
{
console.log("ghfg");
}
           // if(data.ExtCode){
            // const response={ExtCode:data.ExtCode};
            // this.salesResponse=response;
            // }
            // else{
            //     var hhh:Error=data[0];
            // }
          });
    }
}
